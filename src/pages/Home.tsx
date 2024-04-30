import { AwayDropDown, HomeDropDown } from "../Dropdown";

export function Home() {
    return (
       <div>
            <div className="glow">
                <h1>Welcome to Momentum</h1>
            </div>
            <div className="home-predict">
                {/* <AwayDropDown /> */}
                <h1>@</h1>
                {/* <HomeDropDown /> */}
                <br/>
                <button>Predict</button>
            </div>
        </div> 
        );
  }