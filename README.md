# Form Control and Authentication in React SPA
This project will demonstrate how to integrate User Authentication and how to control Forms in a React Application.

## Dependencies

* `react`
* `react-router`
* `react-router-dom`
* `axios`
* **Google Firebase** for Backend
* `SCSS`

## Description

In this project we are going to implement how we use Forms in a React application and how we do validations.<br>
This project will also demonstrate, how we can authenticate the user in a React Single Page Application.<br>
>For authenticating the user, we are going to use **Token** based authentication.<br>
>We will use Google Firebase backed for this project.

# Working with forms in React | Uploading media content to server

If we need to work with Forms in REACT, and we encounter a situation where we need to upload the media to the server through `POST` request, we are going to use javascript's `FormData()` API.

## Usages of `FormData()` API

When we create a new instance of `FormData()` using `new` keyword, we can store the `form data` to the instance by using the `append` method.

```jsx
  constructor(props) {
    super(props);
    // creating the new instance of FormData
    this.formData = new FormData();
    this.state = {
      formData: null
    }
  }

  .
  .

  // checking the type of the target element
  switch (event.target.type) {
      case 'text': // if the target input element is of type 'text'
        if (inputFieldName === 'title') {
          // appending the values in the formData object
          this.formData.append('title', event.target.value);
        } else if (inputFieldName === 'link') {
          // appending the values in the formData object
          this.formData.append('link', event.target.value);
        } else if (inputFieldName === 'publisher') {
          // appending the values in the formData object
          this.formData.append('publisher', event.target.value);
        }
        break;
      
      case 'file': // if the target input element is of type 'file'
        // appending the 'file object' in the formData object
        this.formData.append('thumbnail', event.target.files[0])
        break;
    
      default:
        break;
    }
    // Preparing the state of the application
    this.setState({
      ...this.state,
      formData: this.formData // updating the new formData
    });
  }
```

In this way we can create our `formData` object which will then hold the values of each `form element`. The we can send this `formData` directly to the server using the `POST` request.

```js
  onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log('onSubmitHandler is called');

    // sending the 'formData' to the 'POST' request
    axios.post('https://api.etherealmachines.com/api/v1/medias/', this.state.formData)
      .then(res => {
        // console.log(res);

        document.querySelector("#media-form").reset(); // resetting the form once the its submitted successfully
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }
```

## `query-form.jsx`

Below is the sample code for submitting the form

```jsx
import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../components/ui/input/input';

class Home extends Component {
  constructor(props) {
    super(props);

    this.formData = new FormData();
  }

  state = {
    formData: null
  }

  componentDidMount() {
    const data = {
      username: 'ethereal',
      password: 'machines'
    };

    if (!localStorage.getItem('eth_token')) {
      axios.post('https://api.etherealmachines.com/api-auth-token/', data)
        .then(res => {
          console.log(res);
          localStorage.setItem('eth_token', res.data.token);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  onInputChange = (event) => {
    const inputFieldName = event.target.name;
    switch (event.target.type) {
      case 'text':
        if (inputFieldName === 'title') {
          this.formData.append('title', event.target.value);
        } else if (inputFieldName === 'link') {
          this.formData.append('link', event.target.value);
        } else if (inputFieldName === 'publisher') {
          this.formData.append('publisher', event.target.value);
        }
        break;
      
      case 'file':
          this.formData.append('thumbnail', event.target.files[0])
        break;
    
      default:
        break;
    }

    this.setState({
      ...this.state,
      formData: this.formData
    });

  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log('onSubmitHandler is called');

    axios.post('https://api.etherealmachines.com/api/v1/medias/', this.state.formData)
      .then(res => {
        console.log(res);
        document.querySelector("#media-form").reset();
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  }
  
  render() {
    return (
      <div className="home" style={{gridColumn: "col-start 1 / col-end 12", padding: "15rem 0"}}>
        <form className="auth-form" onSubmit={this.onSubmitHandler} id="media-form">
          <div className="form-control">
            <label htmlFor="#title">Title:</label>
            <input id="title" className="input-element" type="text" onChange={this.onInputChange} name="title" placeholder="Enter the title of the media..." />
          </div>
          <div className="form-control">
            <label htmlFor="#link">Link</label>
            <input id="link" className="input-element" type="text" onChange={this.onInputChange} name="link" placeholder="Enter the link to the media..." />
          </div>
          <div className="form-control">
            <label htmlFor="#publisher">Publisher:</label>
            <input id="publisher" className="input-element" type="text" onChange={this.onInputChange} name="publisher" placeholder="Enter the publisher..." />
          </div>
          <div className="form-control">
            <label htmlFor="#file">Upload Media Image:</label>
            <input id="file" className="input-element" type="file" onChange={this.onInputChange} name="file" />
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default Home;
```

## Another approach of using the `FormData()` API

While submitting the form, we can directly pass the `event.target` to `onSubmit()` method and can create a new instance of `FormData()`. Since we are placing the `onSubmit()` handler to the `form` element itself, the target will have the access to all its child elements.<br><br>

In this way we can grab the data from our child `input` elements and can prepare our `data` object for the `post` request.

### `form`

```jsx
// in the call back function for onSubmit action we are going to pass the `target` element
<form className="auth-form" onSubmit={this.onSubmitHandler} id="media-form">
  <input id="title" className="input-element" type="text" name="title" placeholder="Enter the title of the media..." />

  <input id="link" className="input-element" type="text" name="link" placeholder="Enter the link to the media..." />

  <input id="publisher" className="input-element" type="text" name="publisher" placeholder="Enter the publisher..." />

  <input id="thumbnail" className="input-element" type="file" name="thumbnail" />

  <button type="submit" className="btn">Submit</button>
</form>
```

### `form submission handler function`

```jsx
onSubmitHandler = (event) => {
  event.preventDefault(); // preventing the default behaviour of form submissoin
  const newData  = new FormData(event.target); // creating new instance of FormData (passing the target of event--> In this case it is going to be the 'form' element)

  // creating the new 'media' object for our AJAX 'POST' request
  const media = {
    title: newData.get('title'), // fetching the 'title' field
    link: newData.get('link'), // fetching the 'link' field
    publisher: newData.get('publisher'), // fetching the 'publisher' field
    thumbnail: newData.get('file'), // fetching the 'file' field
  };

console.log(media);

//  Send the AJAX POST request afterwards.
```