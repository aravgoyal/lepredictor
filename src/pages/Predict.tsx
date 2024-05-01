import { AwayDropDown, HomeDropDown } from "../Dropdown";
import { DropdownMenu } from "../Dropdown";

export function Predict() {
    return (
        <div>
            <h1 className="glow">Momentum</h1>
            {/* <div className="home-predict">
                <AwayDropDown />
                <h1 className="at">@</h1>
                <HomeDropDown />
                <a href="/login">
                    <button>Predict</button>
                </a>
            </div> */}
            <DropdownMenu/>
        </div>
        
        );
  }