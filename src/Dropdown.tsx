import React, { useState } from 'react';
import axios from 'axios';
import { nbateams, nflteams, eplteams } from './assets/Teams.tsx';

export function NBADropdownMenu() {
    const [away, setAway] = useState('');
    const [home, setHome] = useState('');
    const [winner, setWinner] = useState('');
    const [winProb, setWinProb] = useState('');
    const [loading, setLoading] = useState('');

    const handleSelectAway = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setAway(e.target.value);
    };

    const handleSelectHome = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setHome(e.target.value);
    };

    const handleSelectWinner = () => {
        setWinner('');
        setWinProb('');
        setLoading('Loading...');
        if (away.length == 0) {
            setLoading("Select an away team!");
        } else if (home.length == 0) {
            setLoading("Select a home team!");
        } else if (home == away) {
            setLoading("Select different teams!");
        }
        console.log('Request sent.');
        axios.post('https://aravgoyal.pythonanywhere.com/api/nba', { away, home })
            .then(response => {
                
                const winnerID = response.data['id'];
                console.log('Winner ID: ' + winnerID);

                const probability = response.data['prob'];
                console.log('Win Probability: ' + probability);

                const winner = nbateams.find(team => team.id === winnerID);

                setWinner(winner ? winner.name : 'Error');
                setWinProb(probability);
                setLoading('');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div>
                <select className='top-dropdown' onChange={handleSelectAway}>
                    <option value="">Select the away team...</option>
                    {nbateams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                <h2 className="at">@</h2>
                <select className="bottom-dropdown" onChange={handleSelectHome}>
                    <option value="">Select the home team...</option>
                    {nbateams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>
            <button className='predict-button' onClick={handleSelectWinner}>Predict</button>
            {loading && <h3 className='loading'>{loading}</h3>}
            {winner && winProb && <h2 className='winner'>There is a {winProb} chance the {winner} will win.</h2>}
        </div>
    );
}

export function NFLDropdownMenu() {
    const [away, setAway] = useState('');
    const [home, setHome] = useState('');
    const [winner, setWinner] = useState('');
    const [winProb, setWinProb] = useState('');
    const [loading, setLoading] = useState('');

    const handleSelectAway = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setAway(e.target.value);
    };

    const handleSelectHome = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setHome(e.target.value);
    };

    const handleSelectWinner = () => {
        setWinner('');
        setWinProb('');
        setLoading('Coming soon...');
        if (away.length == 0) {
            setLoading("Select an away team!");
        } else if (home.length == 0) {
            setLoading("Select a home team!")
        }
        console.log('Request sent.');
        axios.post('http://127.0.0.1:5000/api/nfl', { away, home })
            .then(response => {
                
                const winnerID = response.data['id'];
                console.log('Winner ID: ' + winnerID);

                const probability = response.data['prob'];
                console.log('Win Probability: ' + probability);

                const winner = nflteams.find(team => team.id === winnerID);

                setWinner(winner ? winner.name : 'Error');
                setWinProb(probability);
                setLoading('');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div>
                <select className='top-dropdown' onChange={handleSelectAway}>
                    <option value="">Select the away team...</option>
                    {nflteams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                <h2 className="at">@</h2>
                <select className="bottom-dropdown" onChange={handleSelectHome}>
                    <option value="">Select the home team...</option>
                    {nflteams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>
            <button className='predict-button' onClick={handleSelectWinner}>Predict</button>
            {loading && <h3 className='loading'>{loading}</h3>}
            {winner && winProb && <h2 className='winner'>There is a {winProb} chance the {winner} will win.</h2>}
        </div>
    );
}

export function EPLDropdownMenu() {
    const [away, setAway] = useState('');
    const [home, setHome] = useState('');
    const [winner, setWinner] = useState('');
    const [winProb, setWinProb] = useState('');
    const [loading, setLoading] = useState('');

    const handleSelectAway = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setAway(e.target.value);
    };

    const handleSelectHome = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setHome(e.target.value);
    };

    const handleSelectWinner = () => {
        setWinner('');
        setWinProb('');
        setLoading('Coming soon...');
        if (away.length == 0) {
            setLoading("Select an away team!");
        } else if (home.length == 0) {
            setLoading("Select a home team!")
        }
        console.log('Request sent.');
        axios.post('http://127.0.0.1:5000/api/epl', { away, home })
            .then(response => {
                
                const winnerID = response.data['id'];
                console.log('Winner ID: ' + winnerID);

                const probability = response.data['prob'];
                console.log('Win Probability: ' + probability);

                const winner = eplteams.find(team => team.id === winnerID);

                setWinner(winner ? winner.name : 'Error');
                setWinProb(probability);
                setLoading('');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div>
                <select className='top-dropdown' onChange={handleSelectAway}>
                    <option value="">Select the away team...</option>
                    {eplteams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                <h2 className="at">@</h2>
                <select className="bottom-dropdown" onChange={handleSelectHome}>
                    <option value="">Select the home team...</option>
                    {eplteams.map(team => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>
            <button className='predict-button' onClick={handleSelectWinner}>Predict</button>
            {loading && <h3 className='loading'>{loading}</h3>}
            {winner && winProb && <h2 className='winner'>There is a {winProb} chance the {winner} will win.</h2>}
        </div>
    );
}