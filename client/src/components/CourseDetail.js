import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'

import NotFound from './NotFound'

export default class CourseDetail extends Component {
  constructor(){
    super();
    this.state = {
        courses: [],
        loading: true
    };
}

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
    return ( (this.state.loading)?<p>Loading...</p>:
            <Route render={()=> (courses[num])?<div>
              <div className="actions--bar">
                <div className="bounds">
                  <div className="grid-100"><Route render={ () => (this.props.context.authenticatedUser && this.props.context.authenticatedUser.id===courses[num].userId)?<span><Link className="button" to={`${courses[num].id}/update`}>Update Course</Link><Link className="button" onClick={this.deleteCourse} to="/delete">Delete Course</Link></span>
                  :<p></p>}/>
            <Link className="button button-secondary" to="/">Return to List</Link></div>
                </div>
              </div>
              
              <div className="bounds course--detail">
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{courses[num].title}</h3>
                    <p>By {courses[num].userIdentity.firstName} {courses[num].userIdentity.lastName}</p>
                  </div>
                  <div className="course--description">
                    <ReactMarkdown source={courses[num].description} />
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{courses[num].estimatedTime}</h3>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <ul>
                        <ReactMarkdown source={courses[num].materialsNeeded} />
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
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
            this.props.history.push('/error');
        });
    }


    deleteCourse = () => {
      this.props.context.data.deleteCourse(this.props.context.authenticatedUser.cred, this.props.match.params.id)
      this.props.history.push('/')
    }
  }

