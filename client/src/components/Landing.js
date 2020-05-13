import React from 'react';
import './css/landing.css';
import Footer from './Footer';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
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
        marginTop: theme.spacing(3)
    }
}));

const mainFeaturedPost = {
    title: "WE CAN'T STOP SMILING AT THESE 10 LIFE HACKS",
    description: "Multiple lines of text that form the lede, informing new readers quickly and eff" +
            "iciently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
    linkText: 'Continue reading…'
};

const featuredPosts = [
    {
        id: 13,
        title: 'Featured post',
        date: 'Nov 12',
        description: 'This is a wider card with supporting text below as a natural lead-in to addition' +
                'al content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text'
    }, {
        id: 15,
        title: 'Sample blog post',
        date: 'Nov 11',
        description: 'This blog post shows a few different types of content that are supported and styled with Material styles. Basic typography, images, and code are all supported.' +
                'al content.',
        image: 'https://source.unsplash.com/random',
        imageText: 'Image Text'
    }
];

const posts = [post1, post2, post3];

console.log(posts);

const sidebar = {
    title: 'About',
    id: Math.floor(Math.random() * 12 - 1),
    description: 'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus si' +
            't amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        {
            title: 'March 2020',
            url: '#',
            id: 1
        }, {
            title: 'February 2020',
            url: '#0',
            id: 2
        }, {
            title: 'January 2020',
            url: '#',
            id: 3
        }, {
            title: 'November 1999',
            url: '#',
            id: 4
        }, {
            title: 'October 1999',
            url: '#',
            id: 5
        }, {
            title: 'September 1999',
            url: '#',
            id: 6
        }, {
            title: 'August 1999',
            url: '#',
            id: 8
        }, {
            title: 'July 1999',
            url: '#',
            id: 9
        }, {
            title: 'June 1999',
            url: '#',
            id: 10
        }, {
            title: 'May 1999',
            url: '#',
            id: 11
        }, {
            title: 'April 1999',
            url: '#',
            id: 12
        }
    ],
    social: [
        {
            name: 'GitHub',
            icon: GitHubIcon
        }, {
            name: 'Twitter',
            icon: TwitterIcon
        }, {
            name: 'Facebook',
            icon: FacebookIcon
        }
    ]
}

function Landing() {

    const classes = useStyles();

    return (
        <div className="containe headerImg">

            <React.Fragment>
                <CssBaseline/>
                <div className="con-con">
                    <main className="main">
                        <MainFeaturedPost id="main-post" className="main-post" post={mainFeaturedPost}/>
                        <Grid container spacing={4}>
                            {featuredPosts.map((post) => (<FeaturedPost key={post.id} post={post}/>))}
                        </Grid>
                        <Grid container spacing={5} className={classes.mainGrid}>
                            <Main title="From the firehose" posts={posts}/>
                            <Sidebar
                                key={sidebar.id}
                                title={sidebar.title}
                                description={sidebar.description}
                                archives={sidebar.archives}
                                social={sidebar.social}
                                id={sidebar.id}/>
                        </Grid>
                    </main>
                </div>

            </React.Fragment>
            <Footer/>

        </div>

    )

}

export default Landing;