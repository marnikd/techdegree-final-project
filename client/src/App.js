import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
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


import PrivateRoute from './PrivateRoute'
import withContext from './Context';


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
        <PrivateRoute path="/courses/create" component={CreateCourseContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseContext} />
        <Route path="/courses/:id" component={CourseDetailContext} />
        <Route path="/signin" component={UserSignInContext} />
        <Route path="/signup" component={UserSignUpContext} />
        <Route path="/signout" component={UserSignOutContext} />
        <Route path="/delete" component={Delete} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

