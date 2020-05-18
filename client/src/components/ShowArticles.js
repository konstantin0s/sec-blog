import React, {Component} from 'react';
import axios from 'axios';
import Moment from "moment";
import {Link} from 'react-router-dom';
import Footer from './Footer';
import Loading from './Loading';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactFancyBox from 'react-fancybox';
import 'react-fancybox/lib/fancybox.css';
import './css/ShowArticles.css';

class ShowArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: [],
            isLoading: true
        };
        this.searchHandler = this
            .searchHandler
            .bind(this);
    }

    searchingFor = term => {
        return (x) => {
            return x
                .title
                .includes(term) || !term;
        }
    }

    jsUcfirst = str => {
        return str
            .charAt(0)
            .toUpperCase() + str.slice(1);
    }

    searchHandler(event) {
        this.setState({
            term: this.jsUcfirst(event.target.value)
        })
    }

    componentDidMount() {
        axios
            .get(`${process.env.REACT_APP_API_URL}/articles`, {withCredentials: true})
                    // .get(`/articles`, {withCredentials: true})
            .then(res => {
                this.setState({filtered: res.data, isLoading: false});
            });

    }

    render() {
        const {filtered, term, isLoading} = this.state;
        // console.log(filtered);
        return (
            <React.Fragment>
                <div className="container showArticles">

                    <div className="form-containex">

                        <div className="contain-form">

                            <form className="active-pink active-pink-2">
                                <input
                                    onChange={this.searchHandler}
                                    id="searchField"
                                    className="form-item input"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"/>
                                <div className="search"></div>
                            </form>
                        </div>
                    </div>

                    <div className="grid-container">
                        {isLoading
                            ? <Loading/>
                            : filtered
                                .filter(this.searchingFor(term))
                                .map((article) => <Card className="card-container" key={article._id}>
                                    <CardActionArea>
                                        <ReactFancyBox thumbnail={article.imageUrl} image={article.imageUrl}/>

                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {article.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                        { article.body.slice(0, 100) ? article.body.slice(0, 100) 
                                        : 
                                       'not only five centuries, but also the leap into electronic typesetting' +
                                         ', remaining essentially unchanged. It was popularised in the 1960s w' +
                                         'ith the release of Letraset sheets containing Lorem Ipsum passages, and m'
                                        }
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Posted: {Moment(article.date.dateFrom).format('YYYY-MM-DD')}
                                        </Button>
                                        <Button size="small" color="primary">
                                            <Link className="btn btn-primary linkz" to={`/show/${article._id}`}>Read MORE...</Link>
                                        </Button>
                                        <div className="badges">
                                            <span className="label label-default">alice</span>
                                            <span className="label label-primary">story</span>
                                            <span className="label label-success">blog</span>
                                            <span className="label label-info">personal</span>
                                            <span className="label label-warning">Warning</span>
                                            <span className="label label-danger">Danger</span>
                                        </div>
                                    </CardActions>
                                </Card>)}
                    </div>

                    <Footer/>
                </div>
            </React.Fragment>

        );
    }
}

export default ShowArticles;