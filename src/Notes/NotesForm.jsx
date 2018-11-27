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
import Select from '@material-ui/core/Select';
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
            className: 'CSE 510',
            select_class:'',
            selected_class:'',
            classId:''
        }
        this.converter = new showdown.Converter()
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }
    componentDidMount() {
      this.setState(this.props);
    }
    
     
    handleSelectionChange(event){
        let li = event.target.value.split('_');
        this.setState({ select_class: event.target.value,
          selected_class: li[0],
          classId:li[1]});
    }
    submitChange(){
      const { dispatch } = this.props;
      if (this.state.type=='edit'){
      dispatch(userActions.editNote(this.state));
      }
      else if(this.state.type=='add'){
        dispatch(userActions.addNote(this.state));
      }
  
    }
    render(){
        const { classes_list} = this.props;
        const{type} = this.state;
        let edit = false;
        if (type == 'edit'){
          edit = true
        }
        return (
                <div>
        <Row className="show-grid">
            <Col xs={12} md={6} >
                  {edit && <label>Class name: {this.state.className}</label>}
                  {!edit && 
                        <div>
                        <label>Select Class</label>
                        <Select
                        value={this.state.select_class}
                        onChange={(e) => this.handleSelectionChange(e)}>
                          {classes_list.items.map((class_name, index) =>
                              <option value={class_name.className+'_'+class_name._id}>{class_name.className}</option>
                          )}
                        </Select>
                        </div>
                    }
            </Col>
            <Col xs={12} md={6} >
            <TextField
                id="standard-dense"
                label="Title"
                value = {this.state.title}
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
