export default class Data {
 async api(path, method = 'GET', body = null, requiresAuth = false, encrypted=false, credentials = null) {
    const url = 'http://localhost:5000/api' + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      if(!encrypted){    
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      } else{
        options.headers['Authorization'] = `Basic ${credentials}`;
      }
    }
    return await fetch(url, options);
  }

  //Uses api to try to get the user matching the email and password given as inputs
  async getUser(emailAddress, password) {
    const response = await this.api('/users', 'GET', null, true, false, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  //Creates user through POST /users with the user inputs
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  //Gets all courses in the database 
  async getCourses() {
    const response = await this.api(`/courses`, 'GET');
    if (response.status === 200) {
      return response.json().then(data =>{
        return data.courses;
        });
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  //Gets 1 specific course based on the course id given
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET');
    if (response.status === 200) {
      return response.json().then(data =>{
        return data.course;
        });
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  //Creates a course and uses the credentials to give access to this api function
  async createCourse(course, credentials) {
    const response = await this.api('/courses', 'POST', course, true, true, credentials);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }

  //Creates a course and uses the credentials to give access to this api function
  async updateCourse(course, credentials, id) {
    const response = await this.api( `/courses/${id}`, 'PUT', course, true, true, credentials);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }


  //Deletes the course based on the id given and the credentials to give access to this api function
  async deleteCourse(credentials, id) {
    console.log('deleteCourse function');
    const response = await this.api( `/courses/${id}`, 'DELETE', null, true, true, credentials);
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.message;
      });
    }
    else {
      throw new Error();
    }
  }
}