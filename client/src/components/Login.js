import React, {Component} from 'react';
import {login} from './UserFunctions';
import '../components/css/login.css';
import { Message } from 'semantic-ui-react';
import { Link} from 'react-router-dom';


class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            error: false,
        };
    

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

componentDidMount() {
    this._isMounted = true;
}

componentWillUnmount() {
    this._isMounted = false;
  }


    onChange(e) {
      if (this._isMounted) {
        this.setState({
            [e.target.name]: e.target.value
        })
      }
    }

    validate() {
       let  emailError =  '';
       let  passwordError = '';

       if (!this.state.email.includes('@')) {
           emailError = 'Invalid Email';
       }

       if (!this.state.password) {
        passwordError = 'Invalid Password';
    }


       if (emailError || passwordError) {
        if (this._isMounted) {
           this.setState({ emailError, passwordError });
        }
           return false;
       }
       return true;
    }

    onSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            this.props.history.push('/articles');
            //clear form
            if (this._isMounted) {
           this.setState({
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            error: false,
           });
        }
        } 

    
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        this.setState({ error: false });
         
        login(user).then(res => {
            if (res) {
                if (isValid) {
                    this.props.history.push('/articles');
                    //clear form
                    if (this._isMounted) {
                   this.setState({
                    email: '',
                    password: '',
                    emailError: '',
                    passwordError: '',
                    error: false,
                   });
                }
                }
            }
    
        })
        .catch((err)=> {
            this.props.history.push({ pathname: "/login", state: {message: "unauthorized"}});
        });
    }

    render() {
        const { error } = this.state;
        return (
           <div className="login-container">

                <div className="center">

                <div className="left">
                    {/* left scree background color */}
                    
                </div>
                <div className="right">
                    
                        {/* left scree background color */}
                </div>
                
                <div className="carding">
            
                </div>

                <div className="col-md-10">
                        <form noValidate error={error ? error : undefined} onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Please Log In</h1>
                            {error && <Message error={error ? error : undefined} 
                             content="That username/password is incorrect. Try again!"  />}
                            <div className="form-group one">
                               
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}/>
                            </div> 
                            <div className="emailError" style={{ fontSize: 12, color: "red"}}>{this.state.emailError}</div><br />
                            <div className="form-group two">
                          
                                <input
                                    type="password"
                                    className="form-control"
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