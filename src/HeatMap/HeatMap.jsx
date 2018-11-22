import React from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux';
import {userActions} from "../_actions";
import { Header } from '../Header/Header';
import {Jumbotron, Button} from 'react-bootstrap';
class HeatMap extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAllViews());
    }
   render(){
       const {user,views} = this.props;
        return(
       <div>
           <Header/>
           <Jumbotron>
                <h1>Heatmap of Stackoverflow Use!</h1>
           {views.loading && <em>Loading visualization...</em>}
           {views.items &&
           <Plot
               data={[views.items]}
               layout={{width: 600, height: 400}}
           />
           }
           <p>
                   This visualization displays your weekly stackoverflow activity..
                 </p>
                <h2>Patterns </h2>
                <ul>
                    <li>Users tend to use stackoverflow mainly during weekday and afternoons.</li>
                    <li>Users can see when they are more stuck and can understand their patterns.</li>
                    <li>Patterns indicate weekday trend.</li>
                </ul>
                <p>Heatmaps are a great way to see insights of whole week. Trends show which time you consult Stackoverflow the most. Seeing the topics visualization you can understand which work you are usually stuck and this can compliment that for time.</p>
                <br></br>
                </Jumbotron>
               </div>
           );
   }
}
function mapStateToProps(state) {
    const { views, authentication } = state;
    const { user } = authentication;
    return {
        user,
        views
    };
}

const connectedHeatMap = connect(mapStateToProps)(HeatMap);
export { connectedHeatMap as HeatMap };