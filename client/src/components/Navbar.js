import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store from 'store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons';
import './css/navbar.css';



class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {

if (typeof this.props.match.params.id === 'undefined') {
///skip the error 
} else {
  axios.get(`${process.env.REACT_APP_API_URL}/users/`+this.props.match.params.id)
  .then(res => {
    this.setState({ user: res.data.user });
    // console.log(this.state.user);
  });
}
  }


     logOut(e) {
       e.preventDefault();
       axios.get(`${process.env.REACT_APP_API_URL}/`);
       localStorage.removeItem('usertoken');
       store.remove('loggedIn');
       console.log('you have been logged out. boo!');
       this.props.history.push('/');
      //  store.set('loggedIn', false);
     }

     
     render() {

      const loginRegLink = (
       <ul className="navbar-nav mr-auto navlinks logix">
          <li className="nav-item link logIn">
            <Link to="/login" className="nav-link"> Login</Link>
            </li>
            <li className="nav-item link regIster">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
        </ul>
      );
  
      const userLink = (
       <ul className="nav navbar-nav navlinks">
         <li className="nav-item link user">
           <Link to="/profile" className="nav-link">
            Profile
           </Link>
           </li>
           <li className="nav-item link write">
           <Link to="/article" className="nav-link">
             Write
           </Link>
           </li>
           <li className="nav-item link read">
           <Link to="/articles" className="nav-link">
             Read
           </Link>
           </li>
           <li className="nav-item link logout">
           <button onClick={this.logOut.bind(this)}>
         Logout
         </button> 
       
         </li>
       </ul>
      )
      
      return (

       <nav id="masthead" className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
          <div className="navbar-header">
         {/* <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          
           <span className="icon-bar">x</span>
           <span className="icon-bar">y</span>
           <span className="icon-bar">z</span>
         </button> */}
       </div>
       <div id="navbar" className="collapse navbar-collapse">
         <ul className="nav navbar-nav">
         
       <li className="nav-link link logo">
       <Link to="/" className="nav-link">
          <FontAwesomeIcon icon={faPeopleCarry} />YouHelP
              </Link>
              </li>
         </ul>
       </div>
       {localStorage.usertoken ? userLink : loginRegLink}
     </div>
   </nav>
      )
    }
}


export default withRouter(Navbar);