import { DropdownMenu } from "../Dropdown";

export function Home() {
    return (
       <div>
            <div className="glow">
                <h1>Welcome to Momentum</h1>
            </div>
            <div className="home-predict">
                <DropdownMenu />
            </div>
        </div> 
        );
  }