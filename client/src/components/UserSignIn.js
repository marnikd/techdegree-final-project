import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

   //When changes are made to the input fields the state is changed accordingly
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  //On submition a course variable is created using the state 
  //And are used as variable inputs with the credentials for the createCourse function
  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          this.props.history.push(from);
        }
      })
      .catch((error) => {
        console.error(error);
        this.props.history.push('/error');
      });
  }

  //Returns to mainpage
  cancel = () => {
    this.props.history.push('/');
  }
}