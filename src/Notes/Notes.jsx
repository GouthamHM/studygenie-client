import React from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import {Jumbotron, Button,Card, CardGroup} from 'react-bootstrap';
import RecipeReviewCard from './ExpandableCard';
import hdate from 'human-date';
class Notes extends React.Component{
    // constructor(){
    //     super(props);
        
    // }
    // relaodComponent(){
    //     this.setState({something:true});
    // }
    componentDidMount() {
        this.props.dispatch(userActions.getAllNotes());
        //this.props.dispatch();
        //this.props.dispatch(userActions.getAll());
    }
    render() {
        const {user,notes} = this.props;
        return (
            <div>
                <Header/>
                <h2>Your Notes</h2>
                {notes.loading && <em>Loading visualization...</em>}
                {notes.error && <span className="text-danger">ERROR: {notes.error}</span>}
                {notes.items &&
                    //     <ul>
                    //     {notes.items.map((login, index) =>
                    //         <li key='1'>
                    //             <ul> Hell</ul>
                    //             {/*<TimeDispaly value = {login.time}/>*/}
                    //         </li>
                    //     )}
                    // </ul>
                    <div>
                    {notes.items.map((note,index) => (
                        <RecipeReviewCard 
                            initials={note.user.profile.firstName[0]+note.user.profile.lastName[0]} 
                            className={note.className}
                            id = {note._id}
                            date={hdate.prettyPrint(note.updatedAt)}
                            title ={note.title}
                            mdText = {note.mdText}
                            />
                    ))}  
                    </div>  
                 
                 } 
            </div>
        );
    }

}
function mapStateToProps(state) {
    const { notes, authentication } = state;
    const { user } = authentication;
    return {
        notes,
        user
    };
}

const connectedNotes = connect(mapStateToProps)(Notes);
export { connectedNotes as Notes };