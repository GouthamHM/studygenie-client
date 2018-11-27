import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popup from "reactjs-popup";
import NotesForm from './NotesForm';
import showdown from 'showdown';
import './new.css';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

const styles = theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { expanded: false, open:false };
    this.converter = new showdown.Converter();
    this.deleteNote = this.deleteNote.bind(this);
  }
  handleExpandClick(){
    this.setState({ expanded: !this.state.expanded });
  };
  deleteNote(){
    const { dispatch } = this.props;
    dispatch(userActions.deleteNote(this.props));
  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.props.initials}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.className}
          subheader={this.props.date}
        />
        <CardContent>
          <Typography component="p">
            {this.props.title}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton onClick ={this.deleteNote}aria-label="Delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="Share" onClick = {()=>this.setState({ open: true })}>
                 <Popup
                    open={this.state.open}
                    trigger={ <EditIcon/> }
                    modal
                    closeOnDocumentClick
                  >
                  {close => (
                  <NotesForm
                  type={'edit'}
                  initials={this.props.initials} 
                  className={this.props.className}
                  id = {this.props.id}
                  date={this.props.date}
                  title ={this.props.title}
                  mdText = {this.props.mdText}
                  classes_list = {{items:[]}}
                  />
                  )}
        </Popup>
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick.bind(this)}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {/* <Typography paragraph> */}
            <article
                    className={'markdown-body'}
                    dangerouslySetInnerHTML={{
                    __html: this.converter.makeHtml(this.props.mdText),
                  }}
               /> 
            {/* </Typography> */}
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
    
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(RecipeReviewCard);
function mapStateToProps(state) {
  const { registering } = state.notes;
  return {
      registering
  };
}

export default withStyles(styles)(connect(mapStateToProps)(RecipeReviewCard));