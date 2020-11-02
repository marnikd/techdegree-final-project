import React, { Component } from 'react';
import Form from './Form';


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

  //If user gives input state is changed for this input field
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  //On submition a course variable is created using the state 
  //And are used as variable inputs with the credentials for the createCourse function
  submit = () => {
    const { context } = this.props;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    } = this.state;

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
        this.props.history.push('/error');
      });
  
  }

  //Returns to mainpage
  cancel = () => {
   this.props.history.push('/');
  }
}
