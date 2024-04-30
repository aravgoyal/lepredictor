import { DropDownList } from "@progress/kendo-react-dropdowns";

const teams = ['Atlanta Hawks', 
    'Boston Celtics', 
    'Brooklyn Nets',
    'Charlotte Hornets',
    'Chicago Bulls', 
    'Cleveland Cavaliers', 
    'Dallas Mavericks', 
    'Denver Nuggets', 
    'Detroit Pistons', 
    'Golden State Warriors', 
    'Houston Rockets', 
    'Indiana Pacers', 
    'Los Angeles Clippers', 
    'Los Angeles Lakers', 
    'Memphis Grizzlies', 
    'Miami Heat', 
    'Milwaukee Bucks', 
    'Minnesota Timberwolves', 
    'New Orleans Pelicans',
    'New York Knicks', 
    'Oklahoma City Thunder', 
    'Orlando Magic', 
    'Philadelphia 76ers', 
    'Phoenix Suns', 
    'Portland Trail Blazers', 
    'Sacramento Kings',
    'San Antonio Spurs', 
    'Toronto Raptors', 
    'Utah Jazz ',
    'Washington Wizards'];

export function DropDown() {
    return (
        <DropDownList
            style={{
                width: "300px",
            }}
            data={teams}
            defaultValue="Select the away team..."
            />
    );
}