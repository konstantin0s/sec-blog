import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import './css/Profile.css';


class Profile extends Component {

	constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
			 imageUrl: '',
			date: '',
			id:'',
			errorMessage: ''
    }
  }
 
componentDidMount () {
  const token = localStorage.usertoken;
	console.log(localStorage);
	const decoded = jwt_decode(token);
  this.setState({
    first_name: decoded.first_name,
    last_name: decoded.last_name,
    email: decoded.email,
		imageUrl: decoded.imageUrl,
		date: decoded.date,
		_id: decoded._id,
  })
}

render()
 {
	 console.log(this.state);
   return (
    <div className="container profilePage">
    <div className="row profile">
		<div className="col-md-3">
			<div className="profile-sidebar">
		
				<div className="profile-userpic">
				 <img src="https://as2.ftcdn.net/jpg/00/64/35/15/500_F_64351531_G3zcX9axRaq9QJiTRESkxJenZJHTADyG.jpg" className="img-responsive" alt="" /> 
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
							<button>
							<i className="glyphicon glyphicon-user"></i>
							Account Settings  <Link to={`/editProfile/${this.state._id}`} className="btn btn-danger">Edit</Link>&nbsp; 
							 </button>
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
		<div className="col-md-9">
            <div className="profile-content">
			   Some user related content goes here...
            </div>
		</div>
	</div>


	<footer className="blog-footer">
         <p> 
         &copy; Copyright 2019 YouHelp
</p>
        <p>
           <a href="#masthead">Back to top</a>
        </p>
    </footer>

</div>

   )
 }
}


export default Profile;