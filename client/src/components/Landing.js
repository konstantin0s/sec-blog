import React, {Component} from 'react';
import './css/landing.css';
import {Link} from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="containe headerImg">
 
    <header id="masthead" className="masthead lanImage">
    <div className="overlay"></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div className="site-heading">
            <span className="subheading"><h1>The magic starts here.</h1>
            <h3>Get in touch with others.</h3>
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>



      <div className="container containerX">
      <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">How To Break Your Own Limits.</h1>
          <p className="lead">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.</p>
          {/* <a href="" className="lead mb-0"><Link to="/profile" className="btn btn-primary linkz user">Continue reading...</Link></a> */}
                  <hr />
                     <img  src="https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img-right flex-auto d-none d-md-block" alt="Card cap"/>
        </div>
    

      <div className="row">
        <div className="col-md-6 px-0">
          <div className="card flex-md-row box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
                    <h2 className="display-4 displayh1 font-italic">How To Stop Procrastinating. Two words: Take Action!</h2>
              {/* <h3 className="mb-0">
                <Link to="/profile" className="btn btn-primary linkz">Featured Post</Link>
              </h3> */}
              <div className="text-muted time">Nov 12</div>
              <p className="card-text mb-auto jaja">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            <p className="lead">  <Link to="/profile" className="btn btn-primary linkz continue">Continue reading...</Link> </p>
              {/* <hr /> */}
            </div>
       <img  src="https://images.pexels.com/photos/2042187/pexels-photo-2042187.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img-right flex-auto d-none d-md-block sec" alt="Card cap"/>
          </div>
        </div>
         </div>
         <div className="col-md-12 card-second">
        
            <div className="col-md-12 card-sub">
              <h3 className="mb-0">
                <a className="text-dark" href="/">How To Overcome Fear Of Public Speaking</a>
              </h3>
              <div className="col-md-12 text-muted">Nov 11</div>
              <p className="card-text mb-auto botto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            
            </div>
    
          </div>
  
         <hr />

        <footer className="blog-footer">
         <p> 
         &copy; Copyright 2019 YouHelp
</p>
        <p>
           <a href="#masthead">Back to top</a>
        </p>
    </footer>

      </div>
  
      </div>

               
    )
  }
}
 
export default Landing;