import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    
  };

  constructor() {
    super();
    this.data = new Data();
  }
  

  render() {
    const { authenticatedUser } = this.state;
    let courses;
    const value = {
      authenticatedUser,
      courses,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        fetchCourses: this.fetchCourses,
        fetchCourse: this.fetchCourse
        
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  //Sign in function on client side and sets cookie for authenticated user
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      const authenticatedUser= user.user;
      authenticatedUser.cred = btoa(`${emailAddress}:${password}`)
      this.setState(() => {
        return {
          authenticatedUser: user.user,
        };
      });
      
      Cookies.set('authenticatedUser', JSON.stringify(user.user), { expires: 1 });
    }
    return user;
  }

  //Sign out and removes cookie
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  //Function to fetch all courses
  fetchCourses = () => {
    return this.data.getCourses().then(courses =>{
      return courses;
    })
  }

  //Function to fetch a specific course
  fetchCourse = (id) => {
    return this.data.getCourse(id).then(course =>{
      return course;
    })
  }


}

export const Consumer = Context.Consumer;


//A higher-order component that wraps the provided component in a Context Consumer component.
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

