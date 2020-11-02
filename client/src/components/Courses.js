import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Courses extends Component {
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
    const jsx = [];
    
    //Runs through the courses in this.state.courses and creates the right jsx for every course
    //and pushes the course on the jsx array
      for (const course of courses){
        jsx.push(
            <div key={course.id} className="grid-33"><Link className="course--module course--link" to={`courses/${course.id}`}>
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </Link></div>
      )}
        
    return ( 
      <div className="bounds">
        {jsx}
        <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course</h3>
          </Link></div>
      </div>
    )
  

    }

    //Sets the state to an array of courses fetched with a function uses loading state to make sure 
    //the page only tries to display the courses when finished loading    
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
}

  
export default Courses;