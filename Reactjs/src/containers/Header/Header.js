import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { adminMenu, studentMenu } from './menuApp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineUser } from "@fortawesome/free-solid-svg-icons";

import { faSolid } from "@fortawesome/free-solid-svg-icons";
import { adminMenu } from './menuApp'
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from "../../utils";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    // componentDidMount() {
    //     let { userInfo } = this.props;
    //     let menu = [];
    //     if (userInfo && !_.isEmpty(userInfo)) {
    //         let role = userInfo.roleId;
    //         if(role === USER_ROLE.ADMIN) {
    //             menu = adminMenu;
    //         }

    //         if(role === USER_ROLE.STUDENT) {
    //             menu = studentMenu;
    //         }
    //     }
    //     this.setState({
    //         menuApp: menu
    //     })
    // }

    render() {
        const { processLogout, language, userInfo } = this.props;
        // console.log('check userinfo', userInfo)
        return (
            <React.Fragment>
                <div className="header-container sticky-top">
                    <div className="header-content">
                        <div className="left-content">
                            <h1><a className='font header-logo' style={{color: 'green'}} href="">italk</a></h1>
                        </div>
                        <div className="center-content">
                            {/* thanh navigator */}
                            <Navigator menus={adminMenu} />
                            {/* <Navigator menus={this.state.menuApp} /> */}
                        </div>
                        <div className="right-content">
                            <div className="dropdown">
                                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                    <FontAwesomeIcon  style={{ fontSize: "1rem", paddingRight: '.5rem', cursor: "pointer"}} icon={faQuestionCircle} />                                    
                                    <FormattedMessage id="homeheader.support"/>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VIETNAMESE</span></div>
                                    <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>ENGLISH</span></div>
                                </div>
                            </div>
                            <span className='welcome mx-5'>
                                <FormattedMessage id="homeheader.welcome"/>
                                {userInfo && userInfo.firstName ? userInfo.firstName : 'huhu'}
                            </span>
                        
                        </div>
                        {/* nút logout */}
                        <div className="btn btn-logout" onClick={processLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                        
                    </div>                
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
