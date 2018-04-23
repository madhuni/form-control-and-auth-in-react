import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://form-control-and-auth-in-react.firebaseio.com/'
});

export default instance;