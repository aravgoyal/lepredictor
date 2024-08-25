import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import precision_score
from sklearn.metrics import accuracy_score
from sklearn.naive_bayes import GaussianNB
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

uri = "mongodb+srv://aravgoyal:9bEm16wiXThGu7Ac@footygames.jwayt.mongodb.net/?retryWrites=true&w=majority&appName=FootyGames"
client = MongoClient(uri, server_api=ServerApi('1'), serverSelectionTimeoutMS=10000)
db = client["momentum"]
nfl = db["nfl"]
nba = db["nba"]

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

new_cols = [f"{c}_rolling" for c in cols]
new_cols_home = [f"{c}_rolling" for c in home_cols]
new_cols_home.append(home_cols[-1])
new_cols_away = [f"{c}_rolling" for c in away_cols]
new_cols_away.append(away_cols[-1])
pred_cols = new_cols_away+new_cols_home

allgames = pd.DataFrame(list(nba.find()))
modelNBA = GaussianNB()

all_train, all_test = train_test_split(allgames, test_size=0.33)
model_all = modelNBA.fit(all_train[pred_cols], all_train["W"])
preds = modelNBA.predict(all_test[pred_cols])
combined_all = pd.DataFrame(dict(actual=all_test["W"], predicted=preds), index=all_test.index)
accuracy_all = accuracy_score(all_test["W"], preds)
precision_all = precision_score(all_test["W"], preds)

@app.route('/api/nba', methods=["GET", "POST"])
def predictNBA():
    if request.method == 'POST':
        data = request.get_json()
    else:
        data = {
            'home': '1610612737',
            'away': '1610612738'
        }
    home_id = data['home']
    away_id = data['away']
    home_projection = {field: 1 for field in new_cols_home}
    away_projection = {field: 1 for field in new_cols_away}
    home_stats = list(nba.find_one({"TEAM_ID_HOME": int(home_id)}, projection=home_projection, sort=[("GAME_DATE", -1)]).values())[1:]
    away_stats = list(nba.find_one({"TEAM_ID_AWAY": int(away_id)}, projection=away_projection, sort=[("GAME_DATE", -1)]).values())[1:]
    new_stats = [away_stats+home_stats]

    df_predict = pd.DataFrame(new_stats, columns=pred_cols)
    df_predict['Probability'] = model_all.predict_proba(new_stats)[0][0]
    df_predict['W'] = model_all.predict(new_stats)

    if df_predict['W'].iloc[0] == 1:
        winnerID = str(away_id)
        winProb = str(((1 - df_predict['Probability'].iloc[0]) * 100).round(1)) + '%'
    else:
        winnerID = str(home_id)
        winProb = str((df_predict['Probability'].iloc[0] * 100).round(1)) + '%'

    winner = {'id': winnerID, 'prob': winProb}
    return jsonify(winner), 201

all_teams = pd.DataFrame(list(nfl.find()))

cols = ['totalYards_AWAY', 'rushingAttempts_AWAY', 'rushingYards_AWAY',
       'fumblesLost_AWAY', 'totalPlays_AWAY', 'possession_AWAY',
       'passCompletionEff_AWAY', 'passCompletions_AWAY',
       'passingFirstDowns_AWAY', 'interceptionsThrown_AWAY', 'yardsLost_AWAY',
       'thirdDownEfficiency_AWAY', 'yardsPerPlay_AWAY', 'redZoneEff_AWAY',
       'redZoneScored_AWAY', 'defensiveInterceptions_AWAY',
       'totalDrives_AWAY', 'rushingFirstDowns_AWAY', 'firstDowns_AWAY',
       'passingYards_AWAY', 'yardsPerRush_AWAY',
       'turnovers_AWAY', 'yardsPerPass_AWAY', 'totalYards_HOME',
       'rushingAttempts_HOME', 'rushingYards_HOME', 'fumblesLost_HOME',
       'totalPlays_HOME', 'possession_HOME', 'passCompletionEff_HOME',
       'passCompletions_HOME', 'passingFirstDowns_HOME',
       'interceptionsThrown_HOME', 'yardsLost_HOME',
       'thirdDownEfficiency_HOME', 'yardsPerPlay_HOME', 'redZoneEff_HOME',
       'redZoneScored_HOME', 'defensiveInterceptions_HOME',
       'totalDrives_HOME', 'rushingFirstDowns_HOME', 'firstDowns_HOME',
       'passingYards_HOME', 'yardsPerRush_HOME',
       'turnovers_HOME', 'yardsPerPass_HOME']

new_cols = [f"{c}_rolling" for c in cols]

home_cols = new_cols[:23]
away_cols = new_cols[-23:]

model = GaussianNB()

train, test = train_test_split(all_teams, test_size=0.2)
model = model.fit(train[new_cols], train["W_AWAY"])
preds = model.predict(test[new_cols])
combined = pd.DataFrame(dict(actual=test["W_AWAY"], predicted=preds), index=test.index)
accuracy = accuracy_score(test["W_AWAY"], preds)
precision = precision_score(test["W_AWAY"], preds)

teams = [
    "ARI",  # Arizona Cardinals
    "ATL",  # Atlanta Falcons
    "BAL",  # Baltimore Ravens
    "BUF",  # Buffalo Bills
    "CAR",  # Carolina Panthers
    "CHI",  # Chicago Bears
    "CIN",  # Cincinnati Bengals
    "CLE",  # Cleveland Browns
    "DAL",  # Dallas Cowboys
    "DEN",  # Denver Broncos
    "DET",  # Detroit Lions
    "GB",   # Green Bay Packers
    "HOU",  # Houston Texans
    "IND",  # Indianapolis Colts
    "JAX",  # Jacksonville Jaguars
    "KC",   # Kansas City Chiefs
    "LV",   # Las Vegas Raiders
    "LAC",  # Los Angeles Chargers
    "LAR",  # Los Angeles Rams
    "MIA",  # Miami Dolphins
    "MIN",  # Minnesota Vikings
    "NE",   # New England Patriots
    "NO",   # New Orleans Saints
    "NYG",  # New York Giants
    "NYJ",  # New York Jets
    "PHI",  # Philadelphia Eagles
    "PIT",  # Pittsburgh Steelers
    "SF",   # San Francisco 49ers
    "SEA",  # Seattle Seahawks
    "TB",   # Tampa Bay Buccaneers
    "TEN",  # Tennessee Titans
    "WSH"   # Washington Commanders
]

@app.route('/api/nfl', methods=["GET", "POST"])
def predictNFL():
    if request.method == 'POST':
        data = request.get_json()
    else:
        data = {
            'home': 'NYG',
            'away': 'TEN'
        }
    homeAbv = data["home"]
    awayAbv = data["away"]
    home = list(nfl.find({"teamAbv_HOME": homeAbv}))[-1]
    away = list(nfl.find({"teamAbv_AWAY": awayAbv}))[-1]

    away_stats = [away[field] for field in away_cols if field in away]
    home_stats = [home[field] for field in home_cols if field in home]
    new_stats = [away_stats+home_stats]

    df_predict = pd.DataFrame(new_stats, columns=new_cols)
    df_predict['Probability'] = model.predict_proba(new_stats)[0][0]
    df_predict['W'] = model.predict(new_stats)

    if df_predict['W'].iloc[0] == 1:
        winnerID = awayAbv
        winProb = str(((1 - df_predict['Probability'].iloc[0]) * 100).round(1)) + '%'
    else:
        winnerID = homeAbv
        winProb = str((df_predict['Probability'].iloc[0] * 100).round(1)) + '%'

    winner = {'id': winnerID, 'prob': winProb}
    return jsonify(winner), 201

if __name__ == "__main__":
    app.run(port=3000)