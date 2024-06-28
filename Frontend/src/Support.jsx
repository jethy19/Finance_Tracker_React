import React from 'react';
import './Support.css'
import {
	faEnvelope,
    faPhone
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Support() {
    return (
        <div>
            <div className='cardsetting'>
            <h3 id="settingh3" style={{marginLeft:'10px',marginTop:'20px'}}> Contact </h3>
            <div>
                <FontAwesomeIcon icon={faEnvelope} />
                &nbsp;&nbsp;contactsupport@jjmail.com
            </div>
            <div>
                <FontAwesomeIcon icon={faPhone} />
                &nbsp;&nbsp;+91 7482358647
                <div id='alertdiv' class="danger"><p><strong>Note</strong> Never try to contact we can not provide support</p></div>
            </div>
            </div>


        </div>
    );
}

export default Support