import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import imglogin from '../../images/hinh1.png'
import './Login.scss';
import {IconContext} from "react-icons";
import { FormatteMessage } from 'react-intl';
import { FaFacebook } from 'react-icons/fa';
import { BsYoutube } from 'react-icons/bs';
import { handleLoginApi } from '../../services/userService';
// import { userLoginSuccess } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        // console.log('username: ' +this.state.username)
        // console.log('password: ' +this.state.password)
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
                if(data && data.errCode !== 0){
                    this.setState({
                        errMessage: data.message
                })
            }
            if(data && data.errCode === 0){
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }
        }catch (error) {
            if(error.response) {
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            // console.log(e)
            console.log('hoidanit', error.response)
            
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        return (
           <div>
               <div className="container-fluid bg-login">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-intro">Welcome to <a className='font' style={{color: 'green'}} href="">italk</a></h1>
                        </div>
                        <div className="col-12 distance">
                            <div className='login-wrap login-form'>
                                <div className="image">
                                    <img
                                        width="200" height="180"
                                        className="img-content"
                                        src={imglogin}
                                        alt=""
                                    />
                                </div>
                                <div className="form-inner">
                                    <h2 className='text-center'>LOGIN</h2>
                                    <div className="form-group mt-4">
                                        <label>Username</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={this.state.username} 
                                            onChange={(event) => this.handleOnChangeUsername(event)} 
                                        />
                                    </div>
                                    <div className="form-group mt-4">
                                        <label>Password</label>
                                        <div className="custom-icon">
                                            <input
                                                className="form-control" 
                                                type={this.state.isShowPassword ? 'text' : 'password'} 
                                                value={this.state.password} 
                                                onChange={(event) => this.handleOnChangePassword(event)}
                                            />

                                            <span onClick={() => {this.handleShowHidePassword()}}>
                                                <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{color:'red'}}>
                                        {this.state.errMessage}
                                    </div>
                                    <button className='btn-login mt-5' onClick={() => {this.handleLogin()}}> LOGIN</button>
                                    <div className="mt-3">
                                        <IconContext.Provider
                                            value={{ color: 'blue', size: '45px' }}
                                            >
                                            <div>
                                                <FaFacebook />
                                                <BsYoutube />
                                            </div>
                                        </IconContext.Provider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
