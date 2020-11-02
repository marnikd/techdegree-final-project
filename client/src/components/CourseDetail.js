import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

export default class CourseDetail extends Component {
  constructor(){
    super();
    this.state = {
        course: [],
        loading: true
    };
}

componentDidMount(){
    this.course();
}

  render() {
    const { course } = this.state;
    
    return ( (this.state.loading)?<p>Loading...</p>:
            <Route render={()=> (course)?<div>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100"><Route render={ () => (this.props.context.authenticatedUser && this.props.context.authenticatedUser.id===course.userId)?<span><Link className="button" to={`${course.id}/update`}>Update Course</Link><Link className="button" onClick={this.deleteCourse} to="/delete">Delete Course</Link></span>
                  :<p></p>}/>
            <Link className="button button-secondary" to="/">Return to List</Link></div>
                </div>
              </div>
              
              <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{course.title}</h3>
                    <p>By {course.userIdentity.firstName} {course.userIdentity.lastName}</p>
                  </div>
                  <div className="course--description">
                    <ReactMarkdown source={course.description} />
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{course.estimatedTime}</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>
                        <ReactMarkdown source={course.materialsNeeded} />
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>:<Redirect exact to="../notfound"/>}/>
   
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

    //Deletes the course by running a function
    deleteCourse = () => {
      this.props.context.data.deleteCourse(this.props.context.authenticatedUser.cred, this.props.match.params.id)
      this.props.history.push('/')
    }
  }

