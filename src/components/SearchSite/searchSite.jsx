import React from 'react';
import { Input } from 'chayns-components';
import './searchSite.css';

class searchSite extends React.Component {
    constructor() {
        super();
        this.state = {
            SiteName: '',
        };
        this.searchSite = this.searchSite.bind(this);
    }
    componentDidUpdate() {
        
    }

    searchSite(e) {
        const { setSearchString } = this.props;
        this.setState({ SiteName: e });
        console.log(e);
        setSearchString(e);
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            searchSite();
        }, 500);
    }
    

    render() {
        const { SiteName } = this.state;
        return (
            <div>
                <Input className="input" placeholder="suchen" autogrow onChange={(e) => { this.searchSite(e); }} value={SiteName}/>
            </div>
        );
    }
}

export default searchSite;
