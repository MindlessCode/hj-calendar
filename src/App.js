import React, { useRef, useState } from 'react'
import moment from 'moment'
import Calendar from './components/Calendar.js';
import './style.css';

const App = () => {
    const styleRef = useRef();
    function translate() {
        styleRef.current.classList.toggle('nav-active');
    }
    const [value, setValue] = useState(moment());
    return (
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
                                <a href="/#">Home</a>
                            </li>
                            <li>
                                <a href="/#">Calendar</a>
                            </li>
                            <li>
                                <a href="/#">Projects</a>
                            </li>
                            <li>
                                <a href="/#">About</a>
                            </li>
                        </ul>
                        <div className="burger" onClick={translate}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                    </nav>
                        <Calendar value={value} onXChange={setValue}/>
                    </div>
        );
}
export default App;
