import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import Profile from './components/Profile';
import Article from './components/Article';
import OneArticle from './components/OneArticle';
import ShowArticles from './components/ShowArticles';
import EditArticle from './components/EditArticle';
import EditProfile from './components/EditProfile';
import PrivateRoute from "./components/PrivateRoute";
import {Whoops404} from './components/Whoops404';





class App extends Component {


    render() {
        return (

            <Router>
                <div className="App">
                    <Navbar />

                    {/* <Navbar userInSession={this.state.loggedInUser} /> */}
                    <Route exact path="/" component={Landing}/>
                    <div className="conta">
                    <Switch>
                    <Route exact path="/login" render={(props)=> <Login {...props} />} />
                     <Route exact path="/register" render={(props)=> <Register {...props} />} />
                   {/* <Route exact path='/register' render={() => <Register getUser={this.getTheUser}/>}/> */}
                        <PrivateRoute path="/profile" component={Profile}/>
                        <PrivateRoute path="/article" component={Article}/>   {/*Add articles form */}
                        <PrivateRoute path="/articles" component={ShowArticles}/>
                        <PrivateRoute path="/show/:id" component={OneArticle} />  {/*Show a single article */}
                        <PrivateRoute path="/edit/:id" component={EditArticle} />
                        <PrivateRoute path="/editProfile/:id" component={EditProfile} />
                        <Route path="*" component={Whoops404} />
                        
                    </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
