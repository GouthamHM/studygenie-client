import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Header } from '../Header/Header';
import NotesForm from '../Notes/NotesForm'
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
        //this.props.dispatch(userActions.getAll());
        this.props.dispatch(userActions.getClasses());
    }
    constructor(props) {
        super(props);
    }
    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    render() {
        const { user ,classes} = this.props;
        return (
            <div>
            <Header/>
            <div className="col-md-12">
            
                <h2>Hi {user.firstName}!</h2>
                <p>Welcome to Study Genie</p>
                <p>Smart note taker and Cheat sheet creator</p>
                <h3>Add your notes</h3>
                {classes.loading && <em>Loading users...</em>}
                {classes.error && <span className="text-danger">ERROR: {classes.error}</span>}
                {classes.items &&
                <NotesForm 
                  type={'add'}
                  initials={''} 
                  className={''}
                  id = {''}
                  date={''}
                  title ={''}
                  mdText = {''}
                  classes_list = {classes}
                  /> 
                }
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { classes,authentication } = state;
    const { user } = authentication;
    return {
        user,
        classes
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };