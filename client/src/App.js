import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Header from './components/Header';
import CourseDetail from './components/CourseDetail';
import Courses from './components/Courses';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import Delete from './components/Delete';
import UnhandledError from './components/UnhandledError';
import Forbidden from './components/Forbidden';


import PrivateRoute from './PrivateRoute';
import withContext from './Context';



//Give context to components that need to make use of this
const HeaderContext = withContext(Header); 
const CourseDetailContext = withContext(CourseDetail);
const CoursesContext = withContext(Courses);
const UserSignUpContext = withContext(UserSignUp);
const UserSignInContext = withContext(UserSignIn);
const UserSignOutContext = withContext(UserSignOut);
const CreateCourseContext = withContext(CreateCourse);
const UpdateCourseContext = withContext(UpdateCourse);



export default () => (
  <Router>
    <div>
      <HeaderContext/>

      <Switch>
        <Route exact path="/" component={CoursesContext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseContext} />
        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseContext} />
        <Route exact path="/courses/:id" component={CourseDetailContext} />
        <Route exact path="/signin" component={UserSignInContext} />
        <Route exact path="/signup" component={UserSignUpContext} />
        <Route exact path="/signout" component={UserSignOutContext} />
        <Route exact path="/delete" component={Delete} />
        <Route exact path="/error" component={UnhandledError}/>
        <Route exact path="/forbidden" component={Forbidden} />
        <Route exact path="/notfound" component={NotFound} />
        <Redirect exact to="/notfound"/>
      </Switch>
    </div>
  </Router>
);

