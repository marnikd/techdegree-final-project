import React from 'react';
import { Link } from 'react-router-dom';

//Shows this user message when a user tries to access a course update page of a course
//He/she doesn't own
export default () => (
  <div className="bounds">
    <h1>Forbidden</h1>
    <p>Sorry! You don't have access to this course.</p>
    <div>
        <p>&nbsp;</p>
        <Link className="button button-secondary" to="/">Return to List</Link>
    </div>
  </div>
);