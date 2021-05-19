import React, { useState } from 'react'
import {  BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Calendar from './components/Calendar.js';
import About from './components/About.js';
import Home from './components/Home.js';
import './style.css';

const App = () => {
 
    const [value, setValue] = useState(moment());
    return (
        <Router>
            <div className="App">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
                />
                <nav className="custom-element-bg">
                    <div className="logo">
                        <h4>HARRY J</h4>
                    </div>
                    <ul className="nav-links" >
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/Calendar">Calendar</Link>
                        </li>
                        <li>
                            <Link to="/Projects">Projects</Link>
                        </li>
                        <li>
                            <Link to="/About">About</Link>
                        </li>
                    </ul>
               
                </nav>
                <Route path='/Calendar' 
                render={(props) => (
                    <>
                    {<Calendar value={value} onXChange={setValue} />}
                    </>
                )}/>
                <Route path='/About' component={About} />
                <Route path='/' exact component={Home} />
            </div>
        </Router>
    );
}
export default App;
