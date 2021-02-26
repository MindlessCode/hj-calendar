import React from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import './FooterNav.css'

export const FooterNav = ({ value, onChange }) => {
    function setToday() {
        return moment().clone();
    }
    const location = useLocation()

    return (
        <footer className="custom-element-bg">
            {
                location.pathname === '/Calendar' && (
                    <ul className="nav-links">
                        <li className="go-today" onClick={() => onChange(setToday())}>
                            Go to Today
                        </li>
                        <li>
                            Day
                        </li>
                        <li>
                            Week
                        </li>
                        <li>
                            Month
                        </li>
                    </ul>
                )}



        </footer>

    )
}

export default FooterNav