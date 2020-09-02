import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import Formular from './Formular/Formular.jsx';
import SearchSite from './SearchSite/searchSite.jsx';
import List from './Liste/List.jsx';
import './App.css';


class App extends PureComponent {
    render() {
        return (
            <div>
                <div className="Titel_texarea">
                    <h1>My favorite Sites</h1>
                    <SearchSite/>
                </div>
                <p id="intro">
                    Willkommen bei den Lieblingsseiten. Hier siehst du welche Seiten
                    von Vielen als Lieblingsseite aufgerufen wurde.
                </p>
                <div>
                    <Formular/>
                </div>
                <div>
                    <List/>
                </div>
            </div>
        );
    }
}

export default App;
export const HotApp = hot(App);
