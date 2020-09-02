import React from 'react';
import { Button } from 'chayns-components';
import './list.css';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            Count: 0,
            SiteName: '',
            isExpanded: false,
            siteList: [],
        };
        this.showless = this.showless.bind(this);
        this.showmore = this.showmore.bind(this);
    }

    async componentDidMount() {
        const { SiteName, Count } = this.state;
        const searchedSite = SiteName;

        let searchedSitefiltered = '';
        if (searchedSite === '') {
            searchedSitefiltered = 'Ahaus';
        } else {
            searchedSitefiltered = searchedSite;
        }

        this.setState({ Count: 1 });
        try {
            // List of the sites.
            // eslint-disable-next-line max-len
            const response = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchedSitefiltered}&Skip=${20 * Count}&Take=20`);
            const list = await response.json();

            console.log('list', list);

            this.setState({ siteList: list.Data });
        } catch (error) {
            console.log('error');
            this.setState({ siteList: null });
        }
    }

    async showmore() {
        this.setState({ isExpanded: true });
    }

    // show less
    async showless() {
        const { SiteName, Count } = this.state;
        const searchedSite = SiteName;

        let searchedSitefiltered = '';
        if (searchedSite === '') {
            searchedSitefiltered = 'Ahaus';
        } else {
            searchedSitefiltered = searchedSite;
        }

        this.setState({ Count: 0 });
        // List of the sites.
        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchedSitefiltered}&Skip=${20 * Count}&Take=20`)
            .then((response) => response.json())
            .then((data) => console.log(data.Data));

        this.setState({ isExpanded: false });
    }


    render() {
        const { isExpanded, siteList } = this.state;
        return (
            <div className="list">
                <div className="sites">
                    {
                        siteList.length > 0
                            ? (
                                siteList.map((site) => (
                                    <div className="site">
                                        <object data={`https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`} type="Image/png">
                                            <img className="SiteImage" src="https://chayns.tobit.com/storage/77892-13928/Images/icon-57.png" alt="fail"/>
                                        </object>
                                        <p className="site__name">{`${site.appstoreName.substring(0, 8)}...`}</p>
                                    </div>
                                ))
                            )
                            : null
                    }
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

export default List;
