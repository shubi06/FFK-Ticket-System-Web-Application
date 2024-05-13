import axios from 'axios';

const API_URL = 'http://localhost:5178/api/account/'; 

// Function to register users
const register = (name, email, password, confirmPassword) => {
  return axios.post(API_URL + 'register', {
    name,
    email,
    password,
    confirmPassword
  });
};

// Function to log in
const login = (email, password) => {
    return axios.post(API_URL + 'login', {
      email,
      password
    }).then((response) => {
      if (response.data.token) {
        // Store the user's token in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        // Set the authorization header for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
      return response.data;
    }).catch(error => {
      console.error('Login error:', error);
      throw error; 
    });
};

// Function to log out
const logout = () => {
  // Remove the user's token from localStorage
  localStorage.removeItem('user');
  // Remove the authorization header
  delete axios.defaults.headers.common['Authorization'];
};

// Export the authService functions
const authService = {
    login,
    logout,
    register
};
  
export default authService;
