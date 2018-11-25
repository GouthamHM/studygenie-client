import React from 'react';
import PropTypes from 'prop-types';
import showdown from 'showdown';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import {Row,Col,Button} from 'react-bootstrap';
import './new.css';
import ReactMarkdownEditor from '@webscopeio/react-markdown-editor';
import { userActions } from '../_actions';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  

});

class  NotesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            className: 'CSE 510'
        }
        this.converter = new showdown.Converter()
        this.handleChange = this.handleChange.bind(this);
        //this.handleChange2 = this.handleChange2.bind(this);
       //this.submitChange = this.submitChange.bind(this);
    }
    componentDidMount() {
      console.log(this.props);
      console.log(this.state);
      this.setState(this.props);
    }
    handleChange (event) {
        this.setState({className: event.target.value});
      }
     
      
    submitChange(){
      
      const { dispatch } = this.props;
      dispatch(userActions.editNote(this.state));
      debugger;
      //this.props.closeMethod();
  
    }
    render(){
        const { classes } = this.props;
        return (
                <div>
        <Row className="show-grid">
            <Col xs={12} md={6} >
                  <label>Class name: {this.state.className}</label>
            </Col>
            <Col xs={12} md={6} >
            <TextField
                id="standard-dense"
                label="Title"
                value = {this.state.title}
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                onChange={({ target: { value } }) => this.setState({ title:value })}
              />
            </Col>
          </Row>
          <Row className="show-grid">
          <Col xs={12} md={6} >
              <ReactMarkdownEditor
                placeholder={'Write something ...'}
                value={this.state.mdText}
                onChange={({ target: { value } }) => this.setState({ mdText:value })}
              />
        </Col>
        <Col xs={12} md={6} >
                <article
                    className={'markdown-body'}
                    dangerouslySetInnerHTML={{
                    __html: this.converter.makeHtml(this.state.mdText),
                  }}
                  />
          </Col>
          </Row>
          <Row>
            <Button
            onClick={(e) => this.submitChange(e)}>Submit</Button>
            </Row>
          </div>
        );
    }
}

NotesForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { registering } = state.votes;
  return {
      registering
  };
}

export default withStyles(styles)(connect(mapStateToProps)(NotesForm));
