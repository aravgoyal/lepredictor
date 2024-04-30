import { AwayDropDown, HomeDropDown } from "../Dropdown";

export function Home() {
    return (
       <div>
            <div className="glow">
                <h1>Welcome to Momentum</h1>
            </div>
            <div className="home-predict">
                <AwayDropDown />
                <h1 className="at">@</h1>
                <HomeDropDown />
                <a href="/login">
                    <button>Predict</button>
                </a>
            </div>
        </div> 
        );
  }