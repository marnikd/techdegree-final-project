import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  
  return(  
  <div className="bounds">
    <h1>Course Deleted</h1>
    <h3>The course has been succesfully deleted!</h3>
    <Link className="button button-secondary" to="/">Return to List</Link>
  </div>
  )
  };
