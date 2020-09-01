import React from 'react';
import { TextArea } from 'chayns-components';
import './searchSite.css';

function searchSite() {
    return (
        <div>
            <TextArea className="input" placeholder="suchen" autogrow/>
        </div>
    );
}

export default searchSite;
