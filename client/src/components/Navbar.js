import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import store from 'store';


class Navbar extends Component {


     logOut(e) {
       e.preventDefault();
       axios.get('/logout');
       localStorage.removeItem('usertoken');
       store.remove('loggedIn');
       console.log('you have been logged out. boo!');
       this.props.history.push('/')
       store.set('loggedIn', false);
     }

     
     render() {
      const loginRegLink = (
       <ul className="navbar-nav mr-auto navlinks">
          <li className="nav-item">
            <Link to="/login" className="nav-link logIn">
              Login
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/register" className="nav-link regIster">
              Register
            </Link>
          </li>
        </ul>
      )
  
      const userLink = (
       <ul className="nav navbar-nav navlinks">
         <li className="nav-item">
           <Link to="/profile" className="nav-link user">
             {/* {this.state.first_name}'s Profile */} Profile
           </Link>
           </li>
           <li className="nav-item">
           <Link to="/article" className="nav-link">
             Blog
           </Link>
           </li>
           <li className="nav-item">
           <Link to="/articles" className="nav-link">
             Show Blogs
           </Link>
           </li>
           <li className="nav-item">
           <a href onClick={this.logOut.bind(this)} className="nav-link logout">
         Logout
         </a> 
       
         </li>
       </ul>
      )
      
      return (

       <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
          <div className="navbar-header">
         <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
         </button>
       </div>
       <div id="navbar" className="collapse navbar-collapse">
         <ul className="nav navbar-nav">
         <Link to="/" className="nav-link active logo">
              You&#9829;Dev
              </Link>
         </ul>
       </div>
       {localStorage.usertoken ? userLink : loginRegLink}
     </div>
   </nav>
      )
    }
}


export default withRouter(Navbar);