// import React from 'react';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js'
import { TextField } from '@mui/material';


import { withRouter } from 'react-router-dom';

class createAssignment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      dueDate: '',
      courseId: '',
    };
  }

 // creating the handle    
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, dueDate, courseId } = this.state;
    fetch(`${SERVER_URL}/assignment/add/${name}/${dueDate}/${courseId}`, {
        method: 'POST',
      })
      // catching the course input error     
      .then(res => {
        if (res.ok) {
        toast.success("Assignment Successfully Added!", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.props.history.push('/');
      } else {
        toast.error("Assignment NOT Added", {
          position: toast.POSITION.BOTTOM_LEFT
      });
    }})
  }

  render() {
    const { name, dueDate, courseId } = this.state;

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '4px',
};

return (
  // creating the form and stylizing 
  <div style={containerStyle}>
    <h2>Create New Assignment</h2>
    <form onSubmit={this.handleSubmit} style={formStyle}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={this.handleChange}
        required
      />
      <label htmlFor="dueDate">Due Date:</label>
      <input
        type="date"
        id="dueDate"
        name="dueDate"
        value={dueDate}
        onChange={this.handleChange}
        required
      />
      <label htmlFor="courseId">Course ID:</label>
      <input
        type="text"
        id="courseId"
        name="courseId"
        value={courseId}
        onChange={this.handleChange}
        required
      />
      <button type="submit" style={buttonStyle}>Create Assignment</button>
    </form>
  </div>
);

  }
}

export default withRouter(createAssignment);
