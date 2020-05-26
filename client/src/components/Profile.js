import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import Footer from './Footer';
import './css/Profile.css';
import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            comments: [],
            imageUrl: '',
            date: '',
            id: '',
            errorMessage: ''
        }
    }

    componentDidMount() {

        axios
        .get(`${process.env.REACT_APP_API_URL}/users/`, {withCredentials: true})
            //   .get(`/users/`, {withCredentials: true})
        .then((response) => {
            // this.setState({users: response.data, userId: response.data[0]._id});
            // console.log(response.data);
        })
        .catch((error) => {
            this.setState({error});
        })

        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);

        this.setState({
            first_name: decoded.first_name,
            last_name: decoded.last_name,
            email: decoded.email,
            imageUrl: decoded.imageUrl,
            date: decoded.date,
            _id: decoded._id,
            comments: decoded.comments
        })
    }

    render() {
        const {
            first_name,
            last_name,
            date,
            _id,
            email
        } = this.state;
        // console.log(this.state);
        return (
          <React.Fragment>
                <div className="profilePage">
                <div className="profile">
                    <div className="col-md-3">
                        <div className="profile-sidebar">

                            <div className="profile-userpic">
                                <img
                                    src="https://source.unsplash.com/random"
                                    className="img-responsive"
                                    alt=""/>
                            </div>

                            <div className="profile-usertitle">
                                <div className="profile-usertitle-name">
                                    {first_name}
                                    {" "}
                                    {last_name}

                                </div>
                                <div className="profile-usertitle-job">
                                    Joined at:
                                    <p>{date}</p>
                                </div>
                            </div>

                            <div className="profile-userbuttons">
                                <button type="button" className="btn btn-success btn-sm">Follow</button>
                                <button type="button" className="btn btn-danger btn-sm">Message</button>
                            </div>

                            <div className="profile-usermenu">
                                <ul className="nav">
                                    <li className="active">
                                        <a href="/">
                                            <i className="glyphicon glyphicon-home"></i>
                                            Overview
                                        </a>
                                    </li>
                                    <li>

                                        <i className="glyphicon glyphicon-user"></i>
                                        Account Settings
                                        <Link to={`/editProfile/${_id}`} className="btn btn-danger">Edit</Link>&nbsp;

                                    </li>
                                    <li>
                                        <a href="/" target="_blank">
                                            <i className="glyphicon glyphicon-ok"></i>
                                            {email}
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="image-back">
                        <div className="profile-content"></div>
                    </div>

                    <div className="other-details">
                        <div className="profile-content">
                     <p>
         
                     </p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
          </React.Fragment>
        )
    }
}

export default Profile;