import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ShowArticles.css';
import Moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class ShowArticles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchingFor = term => {
    return (x) =>  {
      return x.title.includes(term) || !term;
    }
  }

  jsUcfirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

  


  searchHandler(event) {
    this.setState({term: 
    this.jsUcfirst(event.target.value)})
  }

  componentDidMount() {
    axios.get(`/articles`, {withCredentials:true})
      .then(res => {
        this.setState({ filtered: res.data });
        console.log(this.state.filtered);
      });
  }




  render() {
    const { filtered, term } = this.state;
    return ( 
  <div className="container showArticles">
       <form className="active-pink active-pink-2">
  <FontAwesomeIcon className="faSearch" icon={faSearch} />
  <input onChange={this.searchHandler} className="form-item input" type="text" placeholder="Search" aria-label="Search" />
</form>
				
{filtered.filter(this.searchingFor(term)).map((article) =>    

 

<div className="card text-center" key={article._id}>
  <div className="card-body">
    <h2 className="card-title">{article.title}</h2>
    <p className="card-text">You ought to be ashamed of yourself for asking such a simple question,' added the Gryphon; and then they both sat silent and looked at poor Alice, who felt ready to sink into the earth. At last the Gryphon said to the Mock Turtle, 'Drive on, old fellow! Don't be all day about it!' and he went on in these words:
    'Yes, we went to school in the sea, though you mayn't believe it—'
     'I never said I didn't!' interrupted Alice.
     'You did,' said the Mock Turtle.</p>

  </div>
   <span className="artLink">  <Link className="btn btn-primary linkz" to={`/show/${article._id}`}>Read MORE...</Link></span>
  <div className="card-footer text-muted">
   <span> Posted: {Moment(article.date.dateFrom).format('YYYY-MM-DD')}</span>
  </div>
  <div className="badges">
  <span className="label label-default">alice</span> <span className="label label-primary">story</span> <span className="label label-success">blog</span> <span className="label label-info">personal</span> <span className="label label-warning">Warning</span>
   <span className="label label-danger">Danger</span>
  </div><hr />
</div>

)}  

</div>


    );
  }
}

export default ShowArticles;