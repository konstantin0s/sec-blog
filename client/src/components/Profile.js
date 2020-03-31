import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './css/Profile.css';


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
	id:'',
	errorMessage: ''
    }
  }
 
componentDidMount () {
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

render()
 {
	//  console.log(this.state);
   return (
    <div  className="profilePage">
    <div className="profile">
		<div className="col-md-3">
			<div className="profile-sidebar">
		
				<div className="profile-userpic">
				 <img src="https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="img-responsive" alt="" /> 
				</div>
		
				<div className="profile-usertitle">
					<div className="profile-usertitle-name">
          {this.state.first_name} {this.state.last_name}
					{/* {this.state._id} */}
					</div>
					<div className="profile-usertitle-job">
						Joined at: <p>{this.state.date}</p>
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
							Overview </a>
						</li>
						<li>
						
							<i className="glyphicon glyphicon-user"></i>
							Account Settings  <Link to={`/editProfile/${this.state._id}`} className="btn btn-danger">Edit</Link>&nbsp; 
						
						</li>
						<li>
							<a href="/" target="_blank">
							<i className="glyphicon glyphicon-ok"></i>
							{this.state.email} </a>
						</li>
					</ul>
				</div>
			
			</div>
		</div>
		<div className="image-back">
            <div className="profile-content">
	
            </div>
		</div>

		<div className="other-details">
            <div className="profile-content">
	List of comments: 
	{this.state.comments ? this.state.comments : 'No comments yet.'} 
            </div>
		</div>
	</div>


<Footer />

</div>

   )
 }
}


export default Profile;