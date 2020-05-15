import React from 'react';
import rocket from './rocket.png';
import './css/footer.css'

export default function Footer() {
    return (
        <div className="footer-con">
            <footer className="blog-footer">
                <p>
                    <a className="toTop" href="#masthead">
                        <img src={rocket} alt="Rocket"/>
                    </a>
                </p>
                <p>
                    YouHelp &copy; Copyright 2020
                </p>
            </footer>

        </div>
    )
}
