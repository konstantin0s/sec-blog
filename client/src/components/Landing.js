import React, {Component} from 'react';
import './css/landing.css';
import {Link} from 'react-router-dom';
import rocket from './rocket.png';

class Landing extends Component {
  render() {
    return (
      <div className="containe headerImg">
 
    <header id="masthead" className="masthead lanImage">
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-md-12 mx-auto">
          <div className="site-heading">
            <span className="subheading">
              <h1 className="cover-title">WE CAN'T STOP SMILING AT THESE 10 LIFE HACKS</h1>
              <li className="nav-item link">
              <Link to="/articles" className="nav-link">
             READ
           </Link>
                </li>
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>



      <div className="containerX">

        <div className="px-0">
              <h2 className="display-4 font-italic">How To Break Your Own Limits.</h2>
              <div className="text-muted time">Nov 12</div>
          <p className="card-text">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
          {/* <a href="" className="lead mb-0"><Link to="/profile" className="btn btn-primary linkz user">Continue reading...</Link></a> */}
                  <hr />
                     <img  src="https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img-right flex-auto d-none d-md-block" alt="Card cap"/>
            <p className="lead">  <Link to="/profile" className="btn btn-primary linkz continue">Continue reading...</Link> </p>
              {/* <hr /> */}
            </div>
    

        <div className="px-0">
                    <h2 className="display-4 displayh1 font-italic">How To Stop Procrastinating. Two words: Take Action!</h2>
    
              <div className="text-muted time">Nov 12</div>
    
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <img  src="https://images.pexels.com/photos/3597099/pexels-photo-3597099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="card-img-right flex-auto d-none d-md-block sec" alt="Card cap"/>
            <p className="lead">  <Link to="/profile" className="btn btn-primary linkz continue">Continue reading...</Link> </p>
              {/* <hr /> */}
            </div>
      
     
  

         <div className="px-0">
              <h2 className="mb-0">
                <a className="text-dark" href="/">How To Overcome Fear Of Public Speaking</a>
              </h2>
              <div className="col-md-12 text-muted">Nov 11</div>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <img  src="https://images.pexels.com/photos/3857876/pexels-photo-3857876.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="card-img-right flex-auto d-none d-md-block sec" alt="Card cap"/>
              <p className="lead">  <Link to="/profile" className="btn btn-primary linkz continue">Continue reading...</Link> </p>
          </div>
  
         <hr />

      </div>

        
         <footer className="blog-footer">
         <p>
           <a className="toTop" href="#masthead">
       <img src={rocket} alt="Rocket" />
           </a>
        </p>
         <p> 
         YouHelp &copy; Copyright 2020
       </p>
    </footer>

</div>
               
    )
  }
}
 
export default Landing;