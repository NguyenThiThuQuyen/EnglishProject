import React, { Component } from 'react';
import { connect } from 'react-redux';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import './HomeHeader.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from 'react-intl';
class HomeHeader extends Component {

    render() {
        console.log('check props: ', this.props)
        return (
            <React.Fragment>
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <FontAwesomeIcon  style={{ fontSize: "2rem", marginLeft: "1rem", cursor: "pointer"}} icon={faBars} />
                        <h1><a className='font header-logo' style={{color: 'green'}} href="">italk</a></h1>
                    </div>
                    <div className="center-content">
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.topic"/></b></div>
                        </div>
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.storystore"/></b></div>
                        </div>
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.dictionary"/></b></div>
                        </div>
                        <div className="child-content">
                            <div><b><FormattedMessage id="homeheader.forum"/></b></div>
                        </div>
                    </div>
                    <div className="right-content">
                        <div className="support">
                            <FontAwesomeIcon  style={{ fontSize: "1rem", marginLeft: "1rem", cursor: "pointer"}} icon={faQuestionCircle} />
                            <FormattedMessage id="homeheader.support"/>
                        </div>
                        <div className="language-vi">VietNam</div>
                        <div className="language-en">English</div>
                    </div>
                </div>                
            </div>
            <div className="home-header-banner">
                <div className="title1">
                    <FormattedMessage id="banner.title1" /> 
                    <a className='font header-logo' style={{color: 'green', fontSize:'55px', textDecoration: 'none'}} href=""> Italk</a>
                </div>
                <div className="title2"><FormattedMessage id="banner.title2" /></div>
                <div className="btn-item mt-4">
                    <button type="button" className="btn-log mr-4">ĐĂNG NHẬP</button>
                    <button type="button" className="btn-register">ĐĂNG KÝ</button>
                </div>
            </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
