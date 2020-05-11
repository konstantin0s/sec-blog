import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/OneArticle.css';
import jwt_decode from 'jwt-decode';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub }  from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'; 
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Footer from './Footer';

class OneArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
    article: [],
    userId:"",
    articleOwnerId:"",
    owner: "",
    id: "",
    first_name: "",
    like: false,
    likes: 0
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
  
    axios.get(`${process.env.REACT_APP_API_URL}/articles/one/${params.id}`, {withCredentials:true})
      .then(res => {
   
        let userToken = localStorage.usertoken;
        const {_id} = jwt_decode(userToken);
      
        this.setState({ article: res.data, userId:_id, first_name :res.data.owner.first_name, articleOwnerId: res.data.owner._id });
      }).catch(err => {
    
        this.setState({errorMessage:err});
        console.log(err);
      })

      axios.get(`${process.env.REACT_APP_API_URL}/users/one/:id`, {withCredentials:true})  
      .then((response)=> {

        this.setState({owner: response.data.id});

      })
      .catch((error)=> {
          this.setState({error});
      })
  }

  delete(id){
    // console.log(id);
    axios.delete(`${process.env.REACT_APP_API_URL}/articles/`+id, {withCredentials:true})
      .then((result) => {
        this.props.history.push("/profile");
      });
  }

  saveComments = (e)=> {
    e.preventDefault()
    const message = document.getElementById("comment").value;
    const timenow = new Date();
    // debugger
    // axios.post(`${REACT_APP_API_URL}/articles/savecomment`, {id: this.state.article._id, owner: this.state.article.owner, text: message}, {withCredentials:true})
    axios.post(`${process.env.REACT_APP_API_URL}/articles/savecomment`, {id: this.state.article._id, owner: this.state.article.owner, text: message, date: timenow}, {withCredentials:true})
    .then((res) => {
      // debugger
      this.setState({ article: res.data})
        document.getElementById("comment").value = "";
    }).catch(err => {
      // debugger
    })
  }


  showCommentBox() {
    if (this.state.userId !== "") {
      return          <div className="callout secondary">
      <h4 id="commentF" className="leave-comment">Add a Comment</h4>
      <form className="post-edit" ref="commentForm" onSubmit={e => this.saveComments(e)}>
        <textarea id="comment" className="form-comtrol" placeholder="Share your thoughts" required/> <br />
        <button id="submit" type="submit" className="btn btn-primary btn btn-outline comment-btn action-btn expand-right">Post Comment</button>
      </form>

      <h5>{this.state.article.comments.length} Comments</h5>
    </div>
    }
  }

  showComments(){
    if(this.state.article.comments instanceof Array){
        const comments = this.state.article.comments.reverse();
        return comments.map(function(c, i){
    //  console.log(c);
          return    <div key={i} className="showComm">
            <div className="col-md-8">
                  <div className="panel panel-default">
                      <div className="panel-body">
                         <section className="post-heading">
                              <div className="row">
                                  <div className="col-md-11">
                                      <div className="media">
                                        <div className="media-body">
                                          <h3 className="media-heading"> {c.owner.first_name}</h3>
                                          <h5 className="anchor-time"> {c.date} </h5>
                                        </div>
                                      </div>
                                  </div>
                          
                              </div>             
                         </section>
                         <section className="post-body">
                             <p> {c.text} </p>
                         </section>
                         <section className="post-footer">
                         
                             <div className="post-footer-option">
                                  <ul className="list-unstyled">
                                      <li><button><i className="glyphicon glyphicon-thumbs-up"></i> Like</button></li>
                                      <li><a href="#comment"><i className="glyphicon glyphicon-comment"></i> Comment</a></li>
                                      <li><a target="_blank" rel="noopener noreferrer" href="http://facebook.com"><i className="glyphicon glyphicon-share-alt"></i> Share</a></li>
                                  </ul>
                             </div>
                             <div className="post-footer-comment-wrapper">
                                 <div className="comment-form">
                                     
                                 </div>
                                 <div className="comment">
                                      <div className="media">
                                        <div className="media-left">
                                          <button>
                                            <img className="media-object photo-profile" src="http://0.gravatar.com/avatar/38d618563e55e6082adf4c8f8c13f3e4?s=40&d=mm&r=g" width="32" height="32" alt="..." />
                                          </button>
                                        </div>
                                      
                                      </div>
                                 </div>
                             </div>
                         </section>
                      </div>
                  </div>   
            </div>
          </div>
        })
    }        
}



  render() {
    // console.log(this.state)

    let buttons = (this.state.userId && this.state.userId === this.state.articleOwnerId) ? 
    <div className="button-container"> 
      
      
            <Link to={`/edit/${this.state.article._id}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.article._id)} className="btn btn-danger">Delete</button>
        
      </div>
    :
     null
     

    return (


               
      <div className="jumbotron">

      <div className="oneArticle">
       {buttons}  
      </div>    
      <div className="fadeAway"></div>
              <img className="rounded float-left img-responsive" alt="Article" src={this.state.article.imageUrl} />
               <div className="bodys">
               <div className="jumbo"> <h1>{this.state.article.title}</h1>
        <div className="moment-on">

      
        <FontAwesomeIcon className="fa-2x" icon={faEnvelope} /> 
          <a className="faEnvelope" href="#commentF"> 
          Leave a comment
           </a>
      
        <span className="postz">  </span>
        <FontAwesomeIcon className="fa-2x clock" icon={faClock} /> 
          <span className="date">    
           {Moment(this.state.article.date).format('YYYY-MM-DD')}
             </span>
        </div>

             <h4 className="h4">BY </h4>
              <div className="author">
             
              {this.state.article.owner? this.state.article.owner.first_name: ""}</div>
              </div>
              <p className="body-text">{this.state.article.body}</p>
            {this.showCommentBox()}
             <div className="row showcomments">
            {this.showComments()}

            <footer>
    <div className="footer">
      <div className="row">
    
          <ul className="list-inline">
            <li className="list-inline-item">
              <button className="btn btn-success">
                <span className="fa-stack fa-lg">
              <FontAwesomeIcon className="faTwitter" icon={faTwitter} />
                </span>
              </button>
            </li>
            <li className="list-inline-item">
              <button  className="btn btn-success">
                <span className="fa-stack fa-lg">
                  <i className="fas fa-circle fa-stack-2x"></i>
                    <FontAwesomeIcon className="faFacebook" icon={faFacebook} />
                </span>
              </button>
            </li>
            <li className="list-inline-item">
              <button  className="btn btn-success">
                <span className="fa-stack fa-lg">
                   <FontAwesomeIcon className="faGithub" icon={faGithub} />
                </span>
              </button>
            </li>
          </ul>
          <Footer />
        </div>
      </div>

  </footer>

               </div>
            </div>   
            
    

  <div className="pull-right"><span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
                <span className="label label-danger">Danger</span>
           <hr/>
               </div>

    

           </div> 

    );
  }
}

export default OneArticle;