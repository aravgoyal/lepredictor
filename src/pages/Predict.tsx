import { DropdownMenu } from "../Dropdown";

export function Predict() {
    return (
        <div>
        <div className="fade">
            <h1 className="glow">Make Your Prediction</h1>
        </div>
        <div className="fade-delay">
            <h3 className="predict-instr">Choose your home and away teams.</h3>
            <DropdownMenu/>
        </div>
        </div>
        );
  }