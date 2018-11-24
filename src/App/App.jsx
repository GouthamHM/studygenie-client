import React from 'react';
import { Router, Route } from 'react-router-dom';
// import {
//     HashRouter as Router,
//     Route,
//     } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import {HeatMap} from '../HeatMap';
import {UpVoteTrend} from '../UpvoteTrend';
import {Notes} from '../Notes'
class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute path="/login" component={LoginPage} />
                                <PrivateRoute path="/register" component={RegisterPage} />
                                <PrivateRoute path="/weeklyheatmap" component={HeatMap} />
                                <PrivateRoute path="/upvotetrend" component={UpVoteTrend}/>
                                <PrivateRoute path="/notes" render={()=>(<Notes/>)}/>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 