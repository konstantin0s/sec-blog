import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import store from 'store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons';



class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get('/users/'+this.props.match.params.id)
      .then(res => {
        this.setState({ user: res.data.user });
        console.log(this.state.user);
      });
  }


     logOut(e) {
       e.preventDefault();
       axios.get('/');
       localStorage.removeItem('usertoken');
       store.remove('loggedIn');
       console.log('you have been logged out. boo!');
       this.props.history.push('/')
      //  store.set('loggedIn', false);
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
            Profile
           </Link>
           </li>
           <li className="nav-item">
           <Link to="/article" className="nav-link write">
             Write
           </Link>
           </li>
           <li className="nav-item">
           <Link to="/articles" className="nav-link read">
             Read
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
         {/* <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          
           <span className="icon-bar">x</span>
           <span className="icon-bar">y</span>
           <span className="icon-bar">z</span>
         </button> */}
       </div>
       <div id="navbar" className="collapse navbar-collapse">
         <ul className="nav navbar-nav">
         
         <Link to="/" className="nav-link active logo">
          <FontAwesomeIcon icon={faPeopleCarry} />YouHelP  
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