import { DropdownMenu } from "../Dropdown";

export function Home() {
    return (
       <div>
            <div className="fade">
                <h1 className="glow">Welcome to Momentum</h1>
            </div>
            <div className="home-predict">
                <DropdownMenu />
            </div>
        </div> 
        );
  }