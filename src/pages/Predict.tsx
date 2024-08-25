import { NBADropdownMenu, NFLDropdownMenu } from "../Dropdown";
import { NavBar } from "../NavBar";

export function PredictNBA() {
    return (
        <div>
            <NavBar />
            <div className="fade">
                <h1 className="glow">Make Your Prediction</h1>
            </div>
            <div className="fade-delay">
                <h3 className="predict-instr">Choose your home and away teams.</h3>
                <NBADropdownMenu/>
            </div>
        </div>
        );
  }

export function PredictNFL() {
    return (
        <div>
            <NavBar />
            <div className="fade">
                <h1 className="glow">Make Your Prediction</h1>
            </div>
            <div className="fade-delay">
                <h3 className="predict-instr">Choose your home and away teams.</h3>
                <NFLDropdownMenu/>
            </div>
        </div>
        );
  }