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
  
    axios.get(`/articles/one/${params.id}`, {withCredentials:true})
      .then(res => {
   
        let userToken = localStorage.usertoken;
        const {_id} = jwt_decode(userToken);
      
        this.setState({ article: res.data, userId:_id, first_name :res.data.owner.first_name, articleOwnerId: res.data.owner._id });
           console.log(res.data.owner.first_name);
           console.log(this.state.article);
      }).catch(err => {
    
        this.setState({errorMessage:err});
        console.log(err);
      })

      axios.get(`/users/one/:id`, {withCredentials:true})  
      .then((response)=> {
        // let userToken = localStorage.usertoken;
        // const {first_name} = jwt_decode(userToken);
        this.setState({owner: response.data.id});
          // this.setState({owner: response.data.id, first_name:response.data.owner.first_name})
          console.log(this.state.owner);
         
          console.log(response.data.id);
   
      })
      .catch((error)=> {
          this.setState({error});
      })
  }

  delete(id){
    console.log(id);
    axios.delete(`/articles/`+id, {withCredentials:true})
      .then((result) => {
        this.props.history.push("/profile");
      });
  }

  saveComments = (e)=> {
    e.preventDefault()
    const message = document.getElementById("comment").value;
    // debugger
    // axios.post(`${REACT_APP_URL}/articles/savecomment`, {id: this.state.article._id, owner: this.state.article.owner, text: message}, {withCredentials:true})
    axios.post(`/articles/savecomment`, {id: this.state.article._id, owner: this.state.article.owner, text: message}, {withCredentials:true})
    .then((res) => {
      // debugger
      this.setState({ article: res.data})
        document.getElementById("comment").value = "";
    }).catch(err => {
      // debugger
    })
  }

  // saveComments = e => {
  //   e.preventDefault();
  //   const message = document.getElementById("comment").value;
  // console.log(comment);
  
  // const { id } = this.state.article._id;
  // const { owner } = this.state.article.owner;

  //   axios.post(`/articles/savecomment`, {id: id, owner: owner, text: message}, {withCredentials: true })
  //   .then((res) => {
  // console.log(res);
  //     this.setState({ article: res.data})
  //       document.getElementById("comment").value = "";
  //       console.log(this.state.article);
  //   }).catch(err => {
  //  console.log(err);
  //   });
  // }

  showCommentBox() {
    if (this.state.userId !== "") {
      return          <div className="callout secondary">
      <h4 id="commentF" className="leave-comment">Add a Comment</h4>
      <form className="post-edit" ref="commentForm" onSubmit={e => this.saveComments(e)}>
        <textarea id="comment" className="form-comtrol" placeholder="Share your thoughts" required/> <br />
        <button id="submit" type="submit" className="btn btn-primary btn btn-outline comment-btn action-btn expand-right">Post Comment</button>
      </form>
    </div>
    }
  }

  showComments(){
    if(this.state.article.comments instanceof Array){
        const comments = this.state.article.comments.reverse();
        return comments.map(function(c, i){
     
          return    <div key={i} className="container showComm">
            <div className="col-md-8">
                  <div className="panel panel-default">
                      <div className="panel-body">
                         <section className="post-heading">
                              <div className="row">
                                  <div className="col-md-11">
                                      <div className="media">
                                        <div className="media-body">
                                          <h6>Username:</h6><h3 className="media-heading"> {c.owner.first_name}</h3> 
                                          <button className="anchor-time">51 mins</button>
                                        </div>
                                      </div>
                                  </div>
                                   <div className="col-md-1">
                                       <button><i className="glyphicon glyphicon-chevron-down"></i></button>
                                   </div>
                              </div>             
                         </section>
                         <section className="post-body">
                             <p> {c.text} </p>
                         </section>
                         <section className="post-footer">
                             <hr />
                             <div className="post-footer-option container">
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
                                        <div className="media-body">
                                          <button className="anchor-username"><h4 className="media-heading">Media heading</h4></button> 
                              
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
    console.log(this.state)

    let buttons = (this.state.userId && this.state.userId === this.state.articleOwnerId) ? 
    <div className="button-container"> 
      
      
            <Link to={`/edit/${this.state.article._id}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.article._id)} className="btn btn-danger">Delete</button>
        
      </div>
    :
     null
     

    return (


               
      <div className="jumbotron container">

      <div id="masthead" className="oneArticle">
       {buttons}  
      </div>    
      <div class="fadeAway"></div>
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
               </div>
            </div>   
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

  <div className="pull-right"><span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
                <span className="label label-danger">Danger</span>
           <hr/>
               </div>

           </div> 

    );
  }
}

export default OneArticle;