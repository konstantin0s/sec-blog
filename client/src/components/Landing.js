import React from 'react';
import './css/landing.css';
// import {Link} from 'react-router-dom';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};


function Landing() {

  const classes = useStyles();


    return (
      <div className="containe headerImg">

<React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="From the firehose" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
  
    </React.Fragment>
    <Footer />
 
    {/* <header className="masthead lanImage">
    <div className="overlay"></div>
    <div className="container">
      <div className="rowlex">
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
          {/* <a href="" className="lead mb-0"><Link to="/profile" className="btn btn-primary linkz user">Continue reading...</Link></a> 
                  <hr />
                     <img  src="https://images.pexels.com/photos/708440/pexels-photo-708440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img-right flex-auto d-none d-md-block" alt="Card cap"/>
            <p className="lead">  <Link to="/profile" className="btn btn-primary linkz continue">Continue reading...</Link> </p>
      
            </div>
    

        <div className="px-0">
                    <h2 className="display-4 displayh1 font-italic">How To Stop Procrastinating. Two words: Take Action!</h2>
    
              <div className="text-muted time">Nov 12</div>
    
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              <img  src="https://images.pexels.com/photos/3597099/pexels-photo-3597099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="card-img-right flex-auto d-none d-md-block sec" alt="Card cap"/>
            <p className="lead">  <Link to="/profile" className="btn btn-primary linkz continue">Continue reading...</Link> </p>
       
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

      </div> */}



</div>
               
    )

}
 
export default Landing;