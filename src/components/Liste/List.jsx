/* eslint-disable max-len */
import React from 'react';
import { Button } from 'chayns-components';
import PropTypes from 'prop-types';
import './list.css';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            isExpanded: false,
            siteList: [],
            searchFilter: '',
            listNotShown: [],
        };
        this.showless = this.showless.bind(this);
        this.showmore = this.showmore.bind(this);
        this.showElements = this.showElements.bind(this);
    }

    componentDidMount() {
        this.showElements();
    }

    componentDidUpdate() {
        const { searchString } = this.props;
        const { searchFilter } = this.state;

        if (searchString !== searchFilter) {
            this.setState({ searchFilter: searchString });
            this.showElements();
        }
    }

    async showElements() {
        chayns.showWaitCursor();
        const { searchString } = this.props;

        this.setState({ siteList: [] });
        try {
            // eslint-disable-next-line max-len
            const response = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=0&Take=40`);
            const list = await response.json();

            this.setState({ siteList: list.Data.slice(0, 20) });
            this.setState({ listNotShown: list.Data.slice(20, 40) });
        } catch (error) {
            this.setState({ siteList: null });
        }
        chayns.hideWaitCursor();
    }

    async showmore() {
        const { listNotShown } = this.state;
        this.setState({
            isExpanded: true,
        });
        this.setState((prevState) => ({
            siteList: prevState.siteList.concat(listNotShown),
        }));
    }

    // show less
    async showless() {
        this.setState({
            isExpanded: false,
        });
        this.setState((prevState) => ({
            siteList: prevState.siteList.splice(0, 20),
        }));
    }

    render() {
        const { isExpanded, siteList } = this.state;
        return (
            <div className="list">
                <div className="sites">
                    {siteList.length > 0
                        ? (
                            siteList.map((site) => (
                                <div className="site">
                                    <object className="SiteImage" data={`https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`} type="Image/png">
                                        <img className="SiteImage" src="https://chayns.tobit.com/storage/77892-13928/Images/icon-57.png" alt="fail"/>
                                    </object>
                                    <p className="site__name">{`${site.appstoreName.substring(0, 8)}...`}</p>
                                </div>
                            ))
                        )
                        : null}
                </div>
                <div className="buttonDiv">
                    {isExpanded
                        ? <Button className="btn moreless" onClick={this.showless}>Weniger...</Button>
                        : <Button className="btn moreless" onClick={this.showmore}>Mehr...</Button>}
                </div>
            </div>
        );
    }
}

List.propTypes = {
    searchString: PropTypes.string.isRequired,
};

export default List;
