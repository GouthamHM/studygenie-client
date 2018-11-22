import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Header } from '../Header/Header';
class TimeDispaly extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            newdate: null
        };
    }
    render(){
        var newD = new Date(this.value);
        this.setState({mewdate:newD});
        return (
            <ul>{this.state.newdate}</ul>
        )
    }

}

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    render() {
        const { user, users } = this.props;
        return (
            <div>
            <Header/>
            <div className="col-md-12">
            
                <h2>Hi {user.firstName}!</h2>
                <p>Welcome to Study Genie</p>
                <p>Smart note taker and Cheat sheet creator</p>
                <h3>Your Login History: </h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((login, index) =>
                            <li key={login._id}>
                                <ul>{login.time}</ul>
                                {/*<TimeDispaly value = {login.time}/>*/}
                            </li>
                        )}
                    </ul>
                }
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users,authentication } = state;
    const { user } = authentication;
    return {
        user,
        users,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };