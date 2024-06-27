from nba_api.stats.endpoints import leaguegamefinder
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score
from sklearn.metrics import accuracy_score
from sklearn.naive_bayes import GaussianNB
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

cavs = 1610612739
clippers = 1610612746
knicks = 1610612752
celtics = 1610612738
hawks = 1610612737
nets = 1610612751
hornets = 1610612766
bulls = 1610612741
mavericks = 1610612742
nuggets = 1610612743
pistons = 1610612765
warriors = 1610612744
rockets = 1610612745
pacers = 1610612754
lakers = 1610612747
grizzlies = 1610612763
heat = 1610612748
bucks = 1610612749
timberwolves = 1610612750
pelicans = 1610612740
thunder = 1610612760
magic = 1610612753
sixers = 1610612755
suns = 1610612756
blazers = 1610612757
kings = 1610612758
spurs = 1610612759
raptors = 1610612761
jazz = 1610612762
wizards = 1610612764

league_ids = [cavs, clippers, knicks, celtics, hawks, nets, hornets, bulls, mavericks, nuggets, pistons, warriors, rockets,
             pacers, lakers, grizzlies, heat, bucks, timberwolves, pelicans, thunder, magic, sixers, suns, blazers, kings,
             spurs, raptors, jazz, wizards]
no_cavs = [clippers, knicks, celtics, hawks, nets, hornets, bulls, mavericks, nuggets, pistons, warriors, rockets,
          pacers, lakers, grizzlies, heat, bucks, timberwolves, pelicans, thunder, magic, sixers, suns, blazers, kings,
          spurs, raptors, jazz, wizards]

def combine_team_games(df, keep_method='home'):
    # Join every row to all others with the same game ID.
    joined = pd.merge(df, df, suffixes=['_AWAY', '_HOME'],
                      on=['SEASON_ID', 'GAME_ID', 'GAME_DATE'])
    # Filter out any row that is joined to itself.
    result = joined[joined.TEAM_ID_AWAY != joined.TEAM_ID_HOME]
    # Take action based on the keep_method flag.
    if keep_method is None:
        # Return all the rows.
        pass
    elif keep_method.lower() == 'home':
        # Keep rows where TEAM_A is the home team.
        result = result[result.MATCHUP_AWAY.str.contains(' @ ')]
    elif keep_method.lower() == 'away':
        # Keep rows where TEAM_A is the away team.
        result = result[result.MATCHUP_AWAY.str.contains(' vs. ')]
    elif keep_method.lower() == 'winner':
        result = result[result.WL_AWAY == 'W']
    elif keep_method.lower() == 'loser':
        result = result[result.WL_AWAY == 'L']
    else:
        raise ValueError(f'Invalid keep_method: {keep_method}')
    return result

result = leaguegamefinder.LeagueGameFinder()
all_games = result.get_data_frames()[0]

from concurrent.futures import ThreadPoolExecutor

api_cache = {}

def get_games_for_season(team_id, season):
    if (team_id, season) not in api_cache:
        gamefinder = leaguegamefinder.LeagueGameFinder(team_id_nullable=team_id, season_nullable=season)
        api_cache[(team_id, season)] = gamefinder.get_data_frames()[0]
    return api_cache[(team_id, season)]

def get_dfs(team_id):
    seasons = ['2023-24', '2022-23', '2021-22', '2020-21', '2019-20']
    
    # Use ThreadPoolExecutor to fetch data in parallel
    with ThreadPoolExecutor() as executor:
        all_team_games = list(executor.map(lambda season: get_games_for_season(team_id, season), seasons))
    
    # Concatenate all retrieved DataFrames
    all_team_games = pd.concat(all_team_games, ignore_index=True)
    
    # Extract game IDs and filter all games in one step
    game_ids = all_team_games['GAME_ID'].unique()
    filtered_games = all_games[all_games['GAME_ID'].isin(game_ids)]
    
    # Combine team games
    combined_games = filtered_games.groupby('GAME_ID').apply(combine_team_games).reset_index(drop=True)
    
    # Filter home and away games for the given team ID
    df_home = combined_games[combined_games['TEAM_ID_HOME'] == team_id]
    df_away = combined_games[combined_games['TEAM_ID_AWAY'] == team_id]

    # Sort the DataFrames by game date
    df_home = df_home.sort_values(by='GAME_DATE', ascending=True)
    df_away = df_away.sort_values(by='GAME_DATE', ascending=True)
    
    return df_home, df_away

def rolling_averages(group, cols, new_cols):
    rolling_stats = group[cols].rolling(5, closed='left').mean()
    group[new_cols] = rolling_stats
    group = group.dropna(subset=new_cols)
    return group

cols = ['PTS_AWAY', 'FGM_AWAY',
           'FGA_AWAY', 'FG_PCT_AWAY', 'FG3M_AWAY', 'FG3A_AWAY', 'FG3_PCT_AWAY', 'FTM_AWAY', 'FTA_AWAY',
           'FT_PCT_AWAY', 'OREB_AWAY', 'DREB_AWAY', 'REB_AWAY', 'AST_AWAY',
           'TOV_AWAY', 'PLUS_MINUS_AWAY', 'PTS_HOME', 'FGM_HOME', 'FGA_HOME',
           'FG_PCT_HOME', 'FG3M_HOME', 'FG3A_HOME', 'FG3_PCT_HOME', 'FTM_HOME', 'FTA_HOME',
           'FT_PCT_HOME', 'OREB_HOME', 'DREB_HOME', 'REB_HOME', 'AST_HOME',
           'TOV_HOME', 'PLUS_MINUS_HOME']
away_cols = ['PTS_AWAY', 'FGM_AWAY',
           'FGA_AWAY', 'FG_PCT_AWAY', 'FG3M_AWAY', 'FG3A_AWAY', 'FG3_PCT_AWAY', 'FTM_AWAY', 'FTA_AWAY',
           'FT_PCT_AWAY', 'OREB_AWAY', 'DREB_AWAY', 'REB_AWAY', 'AST_AWAY',
           'TOV_AWAY', 'PLUS_MINUS_AWAY']
home_cols = ['PTS_HOME', 'FGM_HOME', 'FGA_HOME',
           'FG_PCT_HOME', 'FG3M_HOME', 'FG3A_HOME', 'FG3_PCT_HOME', 'FTM_HOME', 'FTA_HOME',
           'FT_PCT_HOME', 'OREB_HOME', 'DREB_HOME', 'REB_HOME', 'AST_HOME',
           'TOV_HOME', 'PLUS_MINUS_HOME']
preds = ['PTS_AWAY', 'FGM_AWAY',
           'FGA_AWAY', 'FG_PCT_AWAY', 'FG3M_AWAY', 'FG3A_AWAY', 'FG3_PCT_AWAY', 'FTM_AWAY', 'FTA_AWAY',
           'FT_PCT_AWAY', 'OREB_AWAY', 'DREB_AWAY', 'REB_AWAY', 'AST_AWAY',
           'TOV_AWAY', 'PLUS_MINUS_AWAY', 'PTS_HOME', 'FGM_HOME', 'FGA_HOME',
           'FG_PCT_HOME', 'FG3M_HOME', 'FG3A_HOME', 'FG3_PCT_HOME', 'FTM_HOME', 'FTA_HOME',
           'FT_PCT_HOME', 'OREB_HOME', 'DREB_HOME', 'REB_HOME', 'AST_HOME',
           'TOV_HOME', 'PLUS_MINUS_HOME']

new_cols = [f"{c}_rolling" for c in cols]
new_cols_home = [f"{c}_rolling" for c in home_cols]
new_cols_home.append(home_cols[-1])
new_cols_away = [f"{c}_rolling" for c in away_cols]
new_cols_away.append(away_cols[-1])

pred_cols = new_cols_away+new_cols_home

preds = [f"{c}_rolling" for c in preds]

def add_new_cols(team_id):
    df_home, df_away = get_dfs(team_id)
    
    df_home = rolling_averages(df_home, cols, new_cols)
    df_away = rolling_averages(df_away, cols, new_cols)
    df_home.index = range(0,df_home.shape[0])
    df_away.index = range(0,df_away.shape[0])
    return df_home, df_away

def df_with_target(team_id):
    df_home, df_away = add_new_cols(team_id)
    df_home["W"] = (df_home["WL_HOME"] == "W").astype("int")
    df_away["W"] = (df_away["WL_AWAY"] == "W").astype("int")
    df_home.index = range(0,df_home.shape[0])
    df_away.index = range(0,df_away.shape[0])
    return df_home, df_away

all_home_list = []
all_away_list = []

for team in league_ids:
    df_home, df_away = df_with_target(team)
    all_home_list.append(df_home)
    all_away_list.append(df_away)

all_home = pd.concat(all_home_list, ignore_index=True)
all_away = pd.concat(all_away_list, ignore_index=True)

model = GaussianNB()

home_train, home_test = train_test_split(all_home, test_size=0.15)
model_home = model.fit(home_train[pred_cols], home_train["W"])
preds = model.predict(home_test[pred_cols])
combined_home = pd.DataFrame(dict(actual=home_test["W"], predicted=preds), index=home_test.index)
accuracy_home = accuracy_score(home_test["W"], preds)
precision_home = precision_score(home_test["W"], preds)

away_train, away_test = train_test_split(all_away, test_size=0.15)
model_away = model.fit(away_train[pred_cols], away_train["W"])
preds = model.predict(away_test[pred_cols])
combined_away = pd.DataFrame(dict(actual=away_test["W"], predicted=preds), index=away_test.index)
accuracy_away = accuracy_score(away_test["W"], preds)
precision_away = precision_score(away_test["W"], preds)

@app.route('/api/predict', methods=["GET", "POST"])
def predict():
    if request.method == 'POST':
        data = request.get_json()
    else:
        data = {
            'home': '1610612737',
            'away': '1610612738'
        }
    home_id = int(data['home'])
    away_id = int(data['away'])
    df_home, df_away1 = df_with_target(home_id)
    df_home1, df_away = df_with_target(away_id)
    
    home_stats = list(df_home.loc[:, 'PTS_HOME_rolling':'PLUS_MINUS_HOME_rolling'].iloc[-1])
    home_pm = df_home['PLUS_MINUS_HOME'].iloc[-1]
    home_stats.append(home_pm)
    away_stats = list(df_away.loc[:, 'PTS_AWAY_rolling':'PLUS_MINUS_AWAY_rolling'].iloc[-1])
    away_pm = df_away['PLUS_MINUS_AWAY'].iloc[-1]
    away_stats.append(away_pm)
    new_stats = [away_stats+home_stats]
        
    df_predict = pd.DataFrame(new_stats, columns=pred_cols)
    df_predict['Probability'] = model_away.predict_proba(new_stats)[0][0]
    df_predict['W'] = model_away.predict(new_stats)
    
    if df_predict['W'].iloc[0] == 1:
        winnerID = str(away_id)
        winProb = str(((1 - df_predict['Probability'].iloc[0]) * 100).round(1)) + '%'
    else: 
        winnerID = str(home_id)
        winProb = str((df_predict['Probability'].iloc[0] * 100).round(1)) + '%'

    winner = {'id': winnerID, 'prob': winProb}
    return jsonify(winner), 201
    
if __name__ == "__main__":
    app.run(debug=True)