import React, {Component} from 'react';
import {login} from './UserFunctions';
import '../components/css/login.css';
import { Message } from 'semantic-ui-react';
import { Link} from 'react-router-dom';


const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    error: false,
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    validate = () => {
       let  emailError =  '';
       let  passwordError = '';

       if (!this.state.email.includes('@')) {
           emailError = 'Invalid Email';
       }

       if (!this.state.password) {
        passwordError = 'Invalid Password';
    }


       if (emailError || passwordError) {
           this.setState({ emailError, passwordError });
           return false;
       }
       return true;
    }

    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state); 
            this.props.history.push('/articles');
            //clear form
           this.setState({initialState});
        } 

    
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.setState({ error: false });
         
        login(user).then(res => {
            if (res) {
                if (isValid) {
                    console.log(this.state); 
                    this.props.history.push('/articles');
                    //clear form
                   this.setState({initialState});
                }
                 console.log(user);

                // this.props.history.push('/articles');
            }
            //  else {
            //     this.props.history.push('/login');
            // }
        })
        .catch((err)=> {
            this.props.history.push({ pathname: "/login", state: {message: "unauthorized"}})
        })
    }

    render() {
        const { error } = this.state;
        return (
            <div className="center">
                <div className="carding">
                    <div className="col-md-10">
                        <form noValidate error={error ? error : undefined} onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please Log In</h1>
                            {error && <Message error={error ? error : undefined} 
                             content="That username/password is incorrect. Try again!"  />}
                            <div className="form-group one">
                                <label htmlFor="email">
                                    Email Address
                                </label><br />
                                <input
                                    type="email"
                                    className="form-item"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                            </div> 
                            <div className="emailError" style={{ fontSize: 12, color: "red"}}>{this.state.emailError}</div><br />
                            <div className="form-group two">
                                <label htmlFor="email">
                                    Password
                                </label> <br />
                                <input
                                    type="password"
                                    className="form-item"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                            </div>
                            <div className="passwordError" style={{ fontSize: 12, color: "red"}}>{this.state.passwordError}</div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block three">
                                Sign In
                            </button>
                        </form>

                        <p className="linkTo">Don't have an account? 
                       <Link className="linkie" to={"/register"}> Register</Link>
      </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;