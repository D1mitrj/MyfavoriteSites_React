import React from 'react';
import './Formular.css';
import { Accordion } from 'chayns-components';

function Formular() {
    return (
        <Accordion head="Formular">
            <div className="accordion__content">
                <p>
                    Du willst Deine Lieblingsseite hier sehen? Dann fühl das Formular
                    hier aus und schreib einen Kommentar wieso Deine Lieblingsseite
                    hier aufgeführt werden sollte.
                </p>
                <div className="input-group textInp">
                    <input className="input name" placeholder="Name"/>
                    <input className="input e_mail" placeholder="E-Mail"/>
                    <input className="input adresse" placeholder="Adresse (optional)"/>
                    <input className="input kommentar" placeholder="Kommentar" autogrow/>
                    <input className="input link_der_seite" placeholder="Link der Seite"/>
                </div>
                <button type="button" className="button btn" onClick={console.log('button-Formular')}>Absenden</button>
            </div>
        </Accordion>
    );
}

export default Formular;
