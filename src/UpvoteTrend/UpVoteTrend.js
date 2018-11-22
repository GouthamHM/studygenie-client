import React from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {userActions} from "../_actions";
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import {Jumbotron, Button} from 'react-bootstrap';
class UpVoteTrend extends React.Component{
    componentDidMount() {
        this.props.dispatch(userActions.getAllVotes());
    }
    render(){
        const {user,votes} = this.props;
        return(
            <div>
                <Header/>
                <Jumbotron>
                <h1>Upvotes Trend!</h1>
                {votes.loading && <em>Loading visualization...</em>}
                {votes.items &&
                <LineChart width={600} height={300} data={votes.items} margin={{top: 5, right: 20, bottom: 5, left: 0}}>
                    <Line type="monotone" dataKey="count" stroke="#8884d8"/>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
                    <XAxis dataKey="day"/>
                    <YAxis/>
                    <Tooltip/>
                </LineChart>
                }
                 <p>
                   This visualization displays your upvotes from last 5 days.
                 </p>
                <h2>Patterns </h2>
                <ul>
                    <li>Users increaase upvoting after they see this often.</li>
                    <li>A gradual increase in trensd is found</li>
                    <li>Users are motivated to write when they get more upvotes.</li>
                </ul>
                <p>Appreciatation is a a great way of compliment. The more you give the more you get. We often just use Stackoverflow and never give back. Seeing this trend user will be reminded to upvote and appericate other's help.</p>
                <br></br>
                </Jumbotron>
            </div>);
    }
}
function mapStateToProps(state) {
    const { votes, authentication } = state;
    const { user } = authentication;
    return {
        user,
        votes
    };
}

const connectedUpVoteTrend = connect(mapStateToProps)(UpVoteTrend);
export { connectedUpVoteTrend as UpVoteTrend };