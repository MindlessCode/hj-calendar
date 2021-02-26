import React, { useRef, useState } from 'react'
import {  BrowserRouter as Router, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Calendar from './components/Calendar.js';
import About from './components/About.js';
import './style.css';
import FooterNav from './components/FooterNav.js';

const App = () => {
    const styleRef = useRef();
    function translate() {
        styleRef.current.classList.toggle('nav-active');
    }
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
                    <ul className="nav-links" ref={styleRef}>
                        <li>
                            <Link to="/Home">Home</Link>
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
                    <div className="burger" onClick={translate}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </nav>
                
                <FooterNav value={value} onChange={setValue} />
                <Route path='/Calendar' 
                render={(props) => (
                    <>
                    {<Calendar value={value} onXChange={setValue} />}
                    </>
                )}/>
                <Route path='/About' component={About} />
            </div>
        </Router>
    );
}
export default App;
