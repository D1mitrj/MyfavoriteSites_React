import React from 'react';
import { Input } from 'chayns-components';
import PropTypes from 'prop-types';
import './searchSite.css';

class searchSite extends React.Component {
    constructor() {
        super();
        this.state = {
            SiteName: '',
            timeout: null,
        };
        this.searchSite = this.searchSite.bind(this);
    }

    searchSite(e) {
        const { setSearchString } = this.props;
        const { timeout } = this.state;
        this.setState({ SiteName: e });

        if (timeout !== null) {
            clearTimeout(timeout);
        }
        this.setState({
            timeout:
                setTimeout(() => {
                    setSearchString(e);
                }, 500),
        });
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

searchSite.propTypes = {
    setSearchString: PropTypes.string.isRequired,
};

export default searchSite;
