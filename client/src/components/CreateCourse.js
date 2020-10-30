import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';
import { Route } from 'react-router-dom';


export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime:'',
    materialsNeeded: '',
    userId: this.props.context.authenticatedUser.id,
    errors: [],
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <div>
          <Route render={ () => (errors)?<h2></h2>:<h2 className="validation--errors--label">Validation errors</h2>}/>
            <div className="validation-errors">
              <ul>
                <Route render={ () => (errors)?<li></li>:<li>Please provide a value for "Title"</li>}/>
                <Route render={ () => (errors)?<li></li>:<li>Please provide a value for "Description"</li>}/>
              </ul>
            </div>
          </div>
          <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
           elements={() => (
            <React.Fragment>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div> <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                    value={title} onChange={this.change}></input> 
                </div>
                  <p>By {this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName}</p>
              </div>
              <div className="course--description">
                <div><textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={this.change}></textarea></div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                        placeholder="Hours" value={estimatedTime} onChange={this.change}></input> </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={this.change}></textarea></div>
                  </li>
                </ul>
              </div>
            </div>
            
            </React.Fragment>
           )}  
          />
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state;

    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

   
    const credential = this.props.context.authenticatedUser.cred;
    
    context.data.createCourse(course, credential)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
              this.props.history.push('/');    
            }
        }
      )
      .catch((err) => {
        console.log(err);
        this.props.history.push('/');
      });
  
  }

  cancel = () => {
   this.props.history.push('/');
  }
}
