import React, { Component } from 'react';
import axios from 'axios';
import Input from '../../components/ui/input/input';
import newsIcon from '../../assets/images/news-icon.svg';
import uploadIcon from '../../assets/images/upload-icon.svg';

import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.formData = new FormData();
  }

  state = {
    formData: null,
    formValid: true,
    errorMsg: null,
    fileName: null
  }

  onClearningFormData() {
    this.formData.delete('title');
    this.formData.delete('link');
    this.formData.delete('publisher');
    this.formData.delete('thumbnail');
  }

  componentDidMount() {
    const data = {
      username: '',
      password: ''
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
      formData: this.formData,
      fileName: (event.target.type === 'file' && event.target.files[0] !== undefined) ? event.target.files[0].name : null
    });

  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    axios.post('https://api.etherealmachines.com/api/v1/medias/', this.state.formData)
      .then(res => {
        console.log(res);
        document.querySelector("#media-form").reset();
        this.onClearningFormData();
        this.setState({
          ...this.state,
          formValid: true,
          errorMsg: null,
          fileName: null
        });
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data);

          this.setState({
            ...this.state,
            formValid: false,
            errorMsg: err.response.data
          });
        }
      });
  }

  render() {
    const errorMsg = !this.state.formValid ? <p className="auth-error-msg">Form is not valid!</p> : null;

    return (
      <div className="home">
        {errorMsg}
        <form className="auth-form" onSubmit={this.onSubmitHandler} id="media-form">
          <img src={newsIcon} alt="News Icon" width="100" height="100" className="user-icon" />
          <div className="form-control">
            <label className="label" htmlFor="title">Title:</label>
            <input id="title" className="input-element" type="text" onChange={this.onInputChange} name="title" placeholder="Enter the title of the media..." />
            {this.state.errorMsg ?
              (this.state.errorMsg.title ? <label className="label" style={{color: "red"}}>{this.state.errorMsg.title[0]}</label> :
              null) :
            null}
          </div>
          <div className="form-control">
            <label className="label" htmlFor="link">Link</label>
            <input id="link" className="input-element" type="text" onChange={this.onInputChange} name="link" placeholder="Enter the link to the media..." />
            {this.state.errorMsg ?
              (this.state.errorMsg.link ? <label className="label" style={{ color: "red" }}>{this.state.errorMsg.link[0]}</label> :
                null) :
            null}
          </div>
          <div className="form-control">
            <label className="label" htmlFor="publisher">Publisher:</label>
            <input id="publisher" className="input-element" type="text" onChange={this.onInputChange} name="publisher" placeholder="Enter the publisher..." />
            {this.state.errorMsg ?
              (this.state.errorMsg.publisher ? <label className="label" style={{ color: "red" }}>{this.state.errorMsg.publisher[0]}</label> :
                null) :
            null}
          </div>
          <div className="form-control">
            <input id="file" className="file-input" type="file" onChange={this.onInputChange} name="file" />
            <label htmlFor="file" className="file-upload-label"><img src={uploadIcon} width="30" height="30" className="upload-icon" />
              {this.state.fileName ? this.state.fileName : 'Upload media image'}
            </label>
            {this.state.errorMsg ?
              (this.state.errorMsg.thumbnail ? <label className="label" style={{ color: "red", textAlign: "center" }}>{this.state.errorMsg.thumbnail[0]}</label> :
                null) :
            null}
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default Home;