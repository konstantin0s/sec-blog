import React, { Component } from 'react';
import axios from 'axios';
import {handleUpload} from './UserFunctions';
import './css/editProfile.css';

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get(`/users/`+this.props.match.params.id)
      .then(res => {
        this.setState({ user: res.data.user });
        console.log(this.state.user);
      });

      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const state = this.state.user;
    state[e.target.name] = e.target.value;
    console.log(state[e.target.name] );
    console.log(this.state.user);
    this.setState({user:state});
  }

  handleFileUpload(e) {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    
    handleUpload(uploadData)
    .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}

  onSubmit(e) {
    e.preventDefault();

    const { first_name, last_name, email, password } = this.state.user;

    axios.put(`/users/`+this.props.match.params.id, { first_name, last_name, email, password })
      .then((result) => {
        this.props.history.push("/profile/"+this.props.match.params.id);
      });
  }

  render() {
    return (
      <div className="container editProfile">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT PROFILE
            </h3>
          </div>
          <div className="panel-body">
            <h4><span className="glyphicon glyphicon-eye-open"></span></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="title">First Name:</label>
                <input type="text" className="form-control" name="first_name"
                 value={this.state.user.first_name} onChange={this.onChange}
                  placeholder="First Name" />
              </div>
              <div className="form-group">
                <label for="author">Last Name:</label>
                <input type="text" className="form-control"
                 name="last_name" value={this.state.user.last_name}
                  onChange={this.onChange} placeholder="Last Name" />
              </div>
              <div className="form-group">
                <label for="description">Email:</label>
                <input type="text" className="form-control" name="email"
                 value={this.state.user.email} onChange={this.onChange} placeholder="Email" />
              </div>
              {/* <div className="form-group">
                <label for="description">Password:</label>
                <input type="text" className="form-control" name="password" value={this.state.user.password} onChange={this.onChange} placeholder="Password" />
              </div> */}

              {/* <input type="file" onChange={(e) => this.handleFileUpload(e)} />  */}
              <button type="submit" className="btn btn-lg btn-primary btn-block submit">
                              Update
              </button>
            </form>
          </div>
        </div>

        <footer className="blog-footer">
         <p> 
         &copy; Copyright 2020 YouHelp
</p>
        <p>
           <a href="#masthead">Back to top</a>
        </p>
    </footer>
      </div>
    );
  }
}

export default EditProfile;