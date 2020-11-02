import React from 'react';
import { Link } from 'react-router-dom';

//In the header on the right renders a welcome message when there is an authenticated user
//Otherwise has links for sign in and sign up
export default function Header(props){
  return(
      <div className="header">
        <div className="bounds">
          <Link to="/"><h1 className="header--logo">Courses</h1></Link>
          <nav>
            {props.context.authenticatedUser? (
              <React.Fragment>
                <span>Welcome, {props.context.authenticatedUser.firstName} {props.context.authenticatedUser.lastName}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
  )
};
