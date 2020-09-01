import { hot } from 'react-hot-loader/root';
import React, { PureComponent } from 'react';
import Formular from './Formular/Formular.jsx';
import SearchSite from './SearchSite/searchSite.jsx';
import List from './Liste/List.jsx';


class App extends PureComponent {
    render() {
        return (
            <div>
                <h1>My favorite Sites</h1>
                <SearchSite/>
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
