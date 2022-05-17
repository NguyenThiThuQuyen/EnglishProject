import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import './HomeHeader2.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader2 extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;
        return (
            <React.Fragment>
<<<<<<< HEAD
            <div className="home-header-container sticky-top">
                <div className="home-header-content">
=======
            <div className="h-header-container sticky-top">
                <div className="h-header-content">
>>>>>>> 77fb4299d33a2b97d85f56ce212977531290601a
                    <div className="left-content">
                        <FontAwesomeIcon  style={{ fontSize: "2rem", marginLeft: "1rem", cursor: "pointer"}} icon={faBars} />
                        <h1><a className='font header-logo' style={{color: 'white'}} href="">italk</a></h1>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div>
                                <Link to="/home" className='style-link active'>
                                    <b><FormattedMessage id="homeheader.home"/></b>
                                </Link>
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <Link to="/topic" className='style-link active'>
                                    <b><FormattedMessage id="homeheader.topic"/></b>
                                </Link>
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <Link to="/storystore" className='style-link active'>
                                    <b><FormattedMessage id="homeheader.storystore"/></b>
                                </Link>
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <Link to="/dictionary" className='style-link active'>
                                    <b><FormattedMessage id="homeheader.dictionary"/></b>
                                </Link>
                            </div>
                        </div>
                        <div className="child-content">
                            <div>
                                <Link to="/forum" className='style-link active'>
                                    <b><FormattedMessage id="homeheader.forum"/></b>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon  style={{ fontSize: "1rem", paddingRight: '.5rem', cursor: "pointer"}} icon={faQuestionCircle} />
                                <FormattedMessage id="homeheader.support"/>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VIETNAMESE</span></div>
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>ENGLISH</span></div>
                            </div>
                        </div>
                        
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
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader2);
