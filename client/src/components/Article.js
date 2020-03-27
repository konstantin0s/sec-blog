import React, { Component } from 'react';
import {articles} from './UserFunctions';
import {handleUpload} from './UserFunctions';
import axios from 'axios';
import '../components/css/Article.css';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Article extends Component {
  constructor() {
      super();
      this.state = {
          users: [],
          title: '',
          author: '',
          body: '',
          imageUrl: '',
          userId: '',
          error: null
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  componentDidMount(){
     axios.get(`${process.env.REACT_APP_API_URL}/users/`, {withCredentials:true})
    .then((response)=> {
        this.setState({users: response.data, userId: response.data[0]._id});
        console.log(response.data);
    })
    .catch((error)=> {
        this.setState({error});
    })
}

  onChange(e) {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  // this method handles just the file upload
  handleFileUpload(e) {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    
    handleUpload(uploadData)
    .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}

  onSubmit(e) {
      e.preventDefault();

      const article = {
        title: this.state.title,
        author: this.state.author,
         body: this.state.body,
         imageUrl: this.state.imageUrl,
         userId: this.state.userId
      
      }
      console.log(article);

      articles(article).then(res => {
           this.props.history.push('/articles');
      })
  }

  render() {
      return (

        <div className="container addArticle">
        <div className="cardz">
            <div className="col-md-10">
            <form noValidate onSubmit={this.onSubmit}>
                       <h1 className="h3 mb-3 font-weight-normal">Add Article:</h1>
                          <div className="form-group">
                               <label htmlFor="title" className="title">
                                   Title:
                          </label>
                               <input
                                   type="text"
                                   className="form-item"
                               name="title"
                              placeholder="Title"
                               value={this.state.title}
                                   onChange={this.onChange}/>
                           </div>
                           <div className="form-group auth">
                               <label htmlFor="author" className="author">
                                   Author:
                              </label>
                              <div className="center-on-page">
               <div className="label"></div>
                 <div className="select">
                 <select name="slct" className="btn btn-lg btn-primary" id="slct" onChange={this.handleChange}>
                         {this.state.users.map((user)=> 
                                 <option value={user._id}>{user.first_name}</option>
                             )}
                </select>
             </div>
           </div>
                      </div>
                      <div className="form-group">
                               <label htmlFor="body" className="desc">
                                   Description:
                               </label>
                               <textarea
                              type="text"
                                   className="form-item textarea"
                                  name="body"
                                   placeholder="Enter Post"
                                   value={this.state.body}
                               onChange={this.onChange}/>
                           </div>


             <label class="custom-file-upload">
             Image <FontAwesomeIcon icon={faUpload} />
             <input type="file" className="btn btn-warning addPic" onChange={(e) => this.handleFileUpload(e)} /> 
                  </label>
       
                     
                         

                           <button type="submit" className="btn btn-lg btn-primary btn-block">
                              Post
                           </button>
                      </form> 
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

export default Article;