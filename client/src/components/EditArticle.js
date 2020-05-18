import React, {Component} from 'react';
import axios from 'axios';
import Footer from './Footer';
import {handleUpload} from './UserFunctions';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './css/editArticle.css';

class EditArticle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            article: {}
        };

        this.onChange = this
            .onChange
            .bind(this);
            
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }

    componentDidMount() {
        const {params} = this.props.match;

        axios
            .get(`${process.env.REACT_APP_API_URL}/articles/one/${params.id}`, {withCredentials: true})
            // .get(`/articles/one/${params.id}`, {withCredentials: true})
            .then(res => {
                this.setState({article: res.data});
            })
            .catch(err => console.log(err));
    }

    onChange(e) {
        const state = this.state.article;
        state[e.target.name] = e.target.value;
        this.setState({article: state});
    }

    handleFileUpload(e) {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create'
        // POST route
        uploadData.append("imageUrl", e.target.files[0]);

        handleUpload(uploadData).then(response => {
            // console.log('response is: ', response); after the console.log we can see that
            // response carries 'secure_url' which we can use to update the state
            this.setState({imageUrl: response.secure_url});
        }).catch(err => {
            console.log("Error while uploading the file: ", err);
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const {title, body, author, imageUrl} = this.state.article;

        axios
            .put(`${process.env.REACT_APP_API_URL}/articles/one/` + this.props.match.params.id, {title, body, author, imageUrl})
            // .put(`/articles/one/` + this.props.match.params.id, {title, body, author, imageUrl})
            .then((result) => {
                this
                    .props
                    .history
                    .push("/show/" + this.props.match.params.id);
            });
    }

    render() {
        const {title, body} = this.state.article;

        return (
            <div className="editArticle">
                <div className="panel-just">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            EDIT BLOG
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={title}
                                    onChange={this.onChange}
                                    placeholder="Title"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="body"
                                    value={body}
                                    onChange={this.onChange}
                                    placeholder="Description"/>
                            </div>

                            <label className="custom-file-upload">
                                Image
                                <FontAwesomeIcon icon={faUpload}/>
                                <input
                                    type="file"
                                    className="btn btn-warning addPic"
                                    onChange={(e) => this.handleFileUpload(e)}/>
                            </label>

                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Post
                            </button>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default EditArticle;
