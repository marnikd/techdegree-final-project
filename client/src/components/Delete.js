import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  
  //Shows this user message when a course has been succesfully deleted
  return(  
  <div className="bounds">
    <h1>Course Deleted</h1>
    <h3>The course has been succesfully deleted!</h3>
    <div>
    <p>&nbsp;</p>
    <Link className="button button-secondary" to="/">Return to List</Link>
    </div>
  </div>
  )
  };
