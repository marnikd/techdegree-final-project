import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Form from './Form'
import Forbidden from './Forbidden';

export default class UpdateCourse extends Component {
  
    state = {
        courses: [],
        userId: this.props.context.authenticatedUser.id,
        updateSet: false,
        loading: true,
        errors: []
    };


componentDidMount(){
    this.course();
}


  render() {
    const { course } = this.state;

    let {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;    

    return ((this.state.loading)?<p>Loading...</p>:
       <Route render={()=>(this.props.context.authenticatedUser && course && this.props.context.authenticatedUser.id===course.userId)?
       <Route render={()=> (course)?<div className="bounds course--detail">
        <h1>Update Course</h1>
        {this.update()}
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
        </div>:<Redirect exact to="/notfound"/>}/>:<Forbidden/>}/>
    );
  }

  //Function to set the state to the course needed to display and setting the loading so that the page 
  //Only tries to display the course when finished loading
  course = () => {
    this.setState({
        loading: true
    });
    this.props.context.actions.fetchCourse(this.props.match.params.id)
    .then(response => {
        this.setState({
            course: response,
            loading: false
        });
    })
    .catch(error =>{
        console.log('Error fetching data', error);
        this.props.history.push('/error');
    });
}

  //On fetching the update page the state is set to the data of the course 
  update = () =>{
  if(!this.state.title){
    if(!this.state.updateSet){
    this.setState(() => {
      return{
      title: this.state.course.title,
      description: this.state.course.description,
      estimatedTime: this.state.course.estimatedTime,
      materialsNeeded: this.state.course.materialsNeeded,
      updateSet: true
      };
    });
    }
  }
  }
  
  //When changes are made to the input fields the state is changed accordingly
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
        this.props.history.push('/error');
      });
  
  }

  cancel = () => {
   this.props.history.push(`/courses/${this.props.match.params.id}`);
  }
}
