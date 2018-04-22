import React, { Component } from 'react';
import axios from '../../services/axios';
import {connect} from 'react-redux';

import './gallery.css';

import Spinner from '../../components/ui/spinner/spinner';

class Gallery extends Component {
  state = {
    images: null
  };
  componentDidMount() {
    axios.get('/galleries.json?auth=' + this.props.token)
      .then(res => {
        console.log(res);
        this.setState({
          ...this.state,
          images: res.data.images
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let images = [];
    for (let image in this.state.images) {
      images.push({
        id: image,
        src: this.state.images[image]
      });
    }

    let gallery = null;

    if (images.length === 0 && this.props.token !== null) {
      gallery = (
        <div className="loading-spinner">
          <Spinner />
        </div>
      );
    } else if (this.loading) {
      gallery = (
        <div className="loading-spinner">
          <Spinner />
        </div>
      );
    } else if (!this.props.token) {
      gallery = (
        <p style={{textAlign: 'center', gridColumn: '1 / -1'}}>You must need to login to view the Gallery!</p>
      );
    } else if (images.length > 0) {
      gallery = images.map(img => {
        return (
          <div className="gallery-item" key={img.id}>
            <img src={img.src} alt="Gallery Item" className="gallery-img" />
            <p className="img-name">{img.id}</p>
          </div>
        );
      });
    }

    return (
      <div className="gallery">
        <h1 className="section-heading">View your beautiful gallery</h1>
        {gallery}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    loading: state.loading
  };
};

export default connect(mapStateToProps)(Gallery);