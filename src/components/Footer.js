import React from 'react'

import valve from '../assets/img/home/valve.png'
import steamlogo from '../assets/img/home/steamlogo.png'

function Footer() {
    return(
        <div className="footer">
            <div className="footerTop">
                <img src={valve} alt=""></img>
                <p>
                    © 2021 Valve Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
                        VAT included in all prices where applicable. <em>Privacy Policy  |  Legal  |  Steam Subscriber Agreement  |  Refunds</em>
                </p>
                <img src={steamlogo} alt=""></img>
            </div>
            <div className="footerBottom">
                <ul>
                    <li>About Valve</li>
                    <li>Steamworks</li>
                    <li>Jobs</li>
                    <li>Steam Distribution</li>
                    <li>Gift Cards</li>
                    <li>Steam</li>
                    <li>@Steam</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;