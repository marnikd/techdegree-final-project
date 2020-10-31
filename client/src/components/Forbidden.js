import React from 'react';
import { Link } from 'react-router-dom';

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