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
        fetchCourses: this.fetchCourses
        
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
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

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  fetchCourses = () => {
    return this.data.getCourses().then(courses =>{
      return courses;
    })
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

