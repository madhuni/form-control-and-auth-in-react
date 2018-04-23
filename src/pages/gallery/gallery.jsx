import React, { Component } from 'react';
import axios from '../../services/axios';
import {connect} from 'react-redux';

import './gallery.css';
import addBtn from '../../assets/images/plus-icon.svg';

import Spinner from '../../components/ui/spinner/spinner';
import Modal from '../../components/ui/modal/modal';

class Gallery extends Component {
  state = {
    images: null,
    showModal: false
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

  showModal = () => {
    this.setState({
      ...this.state,
      showModal: true
    });
  }
  
  closeModal = () => {
    this.setState({
      ...this.state,
      showModal: false
    });

    /* A simple method to stop the youtube video when the modal is closed */
    let iframe = document.querySelector('.player'); // getting the iframe element
    const iframeSrc = iframe.src; // getting the source of element
    iframe.src = iframeSrc; // resetting the source of the element
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
    } else if (this.props.loading) {
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
      <React.Fragment>
        <Modal show={this.state.showModal} clicked={this.closeModal}>
          <iframe src="https://www.youtube.com/embed/2IMMNRmmwhE?rel=0&amp;showinfo=0?enablejsapi" className="player"></iframe>
        </Modal>
        <div className="gallery">
          <h1 className="section-heading">View your beautiful gallery</h1>
          {gallery}
          {this.props.token && images.length !== 0 ? 
            <div className="gallery-item add-btn" onClick={this.showModal}>
              <img src={addBtn} alt="Add Item" className="add-btn-img" width="70" height="70"/>
            </div> :
            null
          }
        </div>
      </React.Fragment>
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