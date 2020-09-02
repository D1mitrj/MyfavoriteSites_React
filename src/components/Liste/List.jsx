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
            searchFilter: '',
            listNotShown: [],
        };
        this.showless = this.showless.bind(this);
        this.showmore = this.showmore.bind(this);
        this.SetState = this.SetState.bind(this);
    }

    componentDidMount() {
        this.SetState();
    }

    componentDidUpdate() {
        const { searchString } = this.props;
        const { searchFilter } = this.state;

        console.log(searchString);
        if (searchString !== searchFilter) {
            this.setState({ searchFilter: searchString });
            this.SetState();
        }
    }

    async SetState(isShowmore) {
        chayns.showWaitCursor();
        const { searchString } = this.props;
        const { Count } = this.state;

        this.setState({siteList: [] });
        // this.setState({ Count: 1 });
        try {
            // List of the sites.
            // eslint-disable-next-line max-len
            const response = await fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchString}&Skip=0&Take=40`);
            const list = await response.json();

            console.log('list', list);
            this.setState({ siteList: list.Data.slice(0, 20) });
            this.setState({ listNotShown: list.Data.slice(20, 40) });

        } catch (error) {
            console.log('error');
            this.setState({ siteList: null });
        }
        chayns.hideWaitCursor();
    }

    async showmore() {
        this.setState({
            isExpanded: true,
            Count: 1,
        });
        this.setState(prevState => {
            return {
                siteList: prevState.siteList.concat(this.state.listNotShown),
            }
        })
    }

    // show less
    async showless() {
        this.setState({
            isExpanded: false,
            Count: 0,
        });
        this.setState(prevState => {
            return {
                siteList: prevState.siteList.splice(0, 20),
            }
        })
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
                                        <object className="SiteImage" data={`https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`} type="Image/png">
                                            <img className="SiteImage" src="https://chayns.tobit.com/storage/77892-13928/Images/icon-57.png" alt="fail" />
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
