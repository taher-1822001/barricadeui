import React from 'react'
import { Link, Navigate } from 'react-router-dom'; 
import  axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import BASE_URL from '../config';
import Header from '../header';
import Footer from '../footer';
class LoginForm extends React.Component
{
    
    constructor(props)
    {
        super(props);
        this.state = {
            passwordState:true,
            newUserState:true,
            title:"Login",
            loginFormState:true,
            showPasswordState:"",
            backButtonState:false,
            buttonText:"Login",
            passwordViewState:"password",
            email:'',
            password:'',
            id:'',
            route:false,
            pError:false,
            eError:false,
            userEmail:Cookies.get('email'),
            userImage:Cookies.get('userImage'),
            userId:Cookies.get('id'),
            toHome:false,
            usrId:''
        };
        Cookies.set('page', 'login');
       
    }
    // handleLoginCheck(){
    //     const {userEmail, userImage, userId} = this.state;
    //     if((userEmail!==undefined || userEmail!=='') && (userImage!==undefined || userImage !=='') && (userId!==undefined || userId!==''))
    //     {
    //         this.setState({toHome:true})
    //     }
    // }
    sendPasswordResetLink = async (e) => {
        e.preventDefault();
    
        // Retrieve the usrId using getId function
        const usrId = await this.getId();
        
        // Check if usrId is valid before proceeding
        if (usrId) {
            let pUrl = `https://contact-app-kappa-vert.vercel.app/passwordreset/${usrId}`;
            let formData = new FormData();
            formData.append('url', pUrl);
            formData.append('email', this.state.email);
            let url = `${BASE_URL}/users/pswdemail`;
        
            axios.post(url, formData)
                .then(response => {
                    toast.success('Password reset link sent to your email');
                })
                .catch(error => {
                    console.error('Error sending password reset link:', error);
                    toast.error('Failed to send password reset link');
                    
                });
        } else {
            console.error('Invalid usrId');
            toast.error('Failed to send password reset link');
        }
    };
    
    getId = async () => {
        try {
            let url = `${BASE_URL}/users/getid?email=${encodeURIComponent(this.state.email)}`;
            const response = await axios.get(url);
            this.setState({ usrId: response.data.id }); // Set usrId state with the retrieved user ID
            console.log("User ID:", response.data.id);
            return response.data.id; // Return the user ID
        } catch (error) {
            console.error("Error fetching user ID:", error);
            const emailError = error?.response?.data?.email
            console.log("email error",error.response.email)
            if(emailError){
                this.setState({eError:true});
            }
        }
    };
    
    LoginLinkFunction = () =>{
        if(this.state.passwordState===true && this.state.newUserState===true)
        {
            this.setState({passwordState: false, newUserState: false, title:"Forgot Password", backButtonState: true, buttonText: "Send Password Reset Link", });
        }
    }
    forgotPasswordStateFunction = () => {
        this.setState({loginFormState:false, newUserState:true})
    }
    newUserStateFunction = () =>{
        if(this.state.loginFormState===true)
        {
            this.setState({loginFormState:false});
        }
    }

    backStateFunction = () =>{
        this.setState({passwordState: true, newUserState: true, title:"Login", backButtonState: false, buttonText:"Login",});
    }

    passwordViewStateFunction = () =>{
        if(this.state.passwordViewState==="password")
        {
            this.setState({passwordViewState:"text"})
        }
        else{
            this.setState({passwordViewState:"password"})
        }
    }
    handleEmailChange = (e) =>{
        this.setState({[e.target.name]:e.target.value, eError:false})
    }
    handlePasswordChange = (e) =>{
        this.setState({[e.target.name]:e.target.value, pError:false})
    }
    login = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
    
        const { email, password } = this.state;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
    
        axios.post(`${BASE_URL}/users/login`, formData)
          .then(response => {
            let id = response.data.id;
            let email = response.data.email;
            let userImage = response.data.image;
            Cookies.set('id', id);
            Cookies.set('email', email);
            Cookies.set('userImage', userImage);
            Cookies.set('notificationMessage', 'Login Success');
            Cookies.set('notificationStatus', 'true')
            this.setState({ route: true });
            toast.success('Login Success')
          })
          .catch(error => {
            // Handle login errors and show feedback to the user
            // For example, display a toast message using react-toastify
            // toast.error('Login failed. Please check your credentials.');
            const pswdError = error?.response?.data?.password;
            const emailError = error?.response?.data?.email;
   
            if(pswdError)
            {
                this.setState({pError:true})
            }
            if(emailError)
            {
                this.setState({eError:true})
            }
            toast.error('login failed')
          });
      };
    //   componentDidMount(){
    //     this.handleLoginCheck();
    //   }
    render(){
       
        return (
            <>
                <Header />
                <ToastContainer />

                <div className='container d-flex justify-content-center align-items-center login-container' style={{ minHeight: '100vh' }}>
                    <div className='card p-4 rounded shadow' style={{ width: '400px' }}>
                        <h2 className="text-center">{this.state.title}</h2>
                        <form onSubmit={this.state.passwordState ? this.login : this.sendPasswordResetLink}>
                            {/* Email Input */}
                            <div className="form-group mb-3">
                                <label htmlFor="Email">Email<span className='text-danger'>*</span></label>
                                <input type="email" className="form-control" id="Email" placeholder="Enter Email" name='email' onChange={this.handleEmailChange} />
                                {this.state.eError && <small className='text-danger'>Email not found</small>}
                            </div>

                            {/* Password Input */}
                            {this.state.passwordState && (
                                <div className="form-group mb-3">
                                    <label htmlFor="pswd">Password<span className='text-danger'>*</span></label>
                                    <input type={this.state.passwordViewState} className="form-control" id="pswd" placeholder="Enter Password" name='password' onChange={this.handlePasswordChange} />
                                    {this.state.pError && <small className='text-danger'>Incorrect Password</small>}
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <input type='checkbox' onClick={this.passwordViewStateFunction} />
                                            <small> Show Password</small>
                                        </div>
                                       
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary w-100">{this.state.buttonText}</button>

                            {/* Back Button */}
                            {this.state.backButtonState && (
                                <button type="button" className="btn btn-outline-primary w-100 mt-2" onClick={this.backStateFunction}>Back</button>
                            )}

                            {/* New User Link */}
                         
                        </form>
                    </div>
                </div>
                <Footer />
            </>
        );
       
    }
}

export default LoginForm;