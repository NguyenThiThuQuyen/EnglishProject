import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { FormattedMessage } from 'react-intl';

import './Header.scss';
import { LANGUAGES } from "../../utils";

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        // console.log('check userinfo', userInfo)
        return (
            <React.Fragment>
                <div className="home-header-container sticky-top">
                    <div className="home-header-content">
                        <div className="left-content">
                            <h1><a className='font header-logo' style={{color: 'green'}} href="">italk</a></h1>
                        </div>
                        <div className="center-content">
                            {/* thanh navigator */}
                            <Navigator menus={adminMenu} />
                        </div>
                        <div className="right-content">
                            <span className='welcome'>
                                <FormattedMessage id="homeheader.welcome"/>
                                {userInfo && userInfo.firstName ? userInfo.firstName : 'huhu'}
                            </span>
                            <span 
                                className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"} 
                                onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                                VN
                            </span>
                            <span 
                                className={language === LANGUAGES.EN ? "language-en active" : "language-en"} 
                                onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                                EN
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
