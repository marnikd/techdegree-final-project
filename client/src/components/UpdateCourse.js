import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Form from './Form';
import NotFound from './NotFound'

export default class UpdateCourse extends Component {
  
    state = {
        courses: [],
        userId: this.props.context.authenticatedUser.id,
        updateSet: false,
        loading: true,
        errors: []
    };


componentDidMount(){
    this.courses();
}


  render() {
    const { courses } = this.state;
    let num;
    for(let i = 0; i< courses.length; i++){
      if(courses[i].id == this.props.match.params.id){
        num = i;
      }
    }

    let {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;    

    return ((this.state.loading)?<p>Loading...</p>:
       <Route render={()=> (courses[num])?<div className="bounds course--detail">
        <h1>Update Course</h1>
        {this.update(num)}
        <div>
          <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
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
        </div>:<NotFound/>}/>
    );
  }

  courses = () => {
    this.setState({
        loading: true
    });
    this.props.context.actions.fetchCourses()
    .then(response => {
        this.setState({
            courses: response,
            loading: false
        });
    })
    .catch(error =>{
        console.log('Error fetching data', error);
    });
}

  update = (num) =>{
  if(!this.state.title){
    if(!this.state.updateSet){
    this.setState(() => {
      return{
      title: this.state.courses[num].title,
      description: this.state.courses[num].description,
      estimatedTime: this.state.courses[num].estimatedTime,
      materialsNeeded: this.state.courses[num].materialsNeeded,
      updateSet: true
      };
    });
    }
  }
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
    const id = this.props.match.params.id;
    
    context.data.updateCourse(course, credential, id)
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
