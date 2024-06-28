import { NavLink } from "react-router-dom";
import { About } from "./About";
import { useEffect, useRef, useState } from "react";
import { NavBar } from "../NavBar";
import silhouette  from "../assets/silhouette.png";

export function Home() {
    const aboutRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      };
  
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      }, options);
  
      if (aboutRef.current) {
        observer.observe(aboutRef.current);
      }
  
      return () => {
        if (aboutRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(aboutRef.current);
        }
      };
    }, []);
  
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="home-title">
            <div className="fade">
              <h1 className="title">What's next?</h1>
            </div>
            <div>
              <h3 className="desc">
                Find the results of tonight's games before they happen.
              </h3>
              <button>
                <NavLink to="/predict">Predict</NavLink>
              </button>
            </div>
          </div>
          <div className="home-right">
            <img className="glow" src={silhouette} width="60%" height="60%" />
          </div>
        </div>
        <div className="home-content">
          <div ref={aboutRef} className={`fade ${isVisible ? "is-visible" : ""}`}>
            {isVisible && <About />}
          </div>
        </div>
      </div>
    );
  }