import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeContent.scss';
import { Link } from "react-router-dom";
import * as BsIcons from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';
import img1 from '../../assets/images/hinh6.png'
import img2 from '../../assets/images/hinh3.png'
import img3 from '../../assets/images/hinh7.png'
import img4 from '../../assets/images/hinh8.png'
import img5 from '../../assets/images/hinh13.png'
import img6 from '../../assets/images/hinh9.png'
import img7 from '../../assets/images/hinh10.png'
import img8 from '../../assets/images/hinh12.png'

class HomeContent extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="home-header-banner">
                    <div className="title1">
                        <FormattedMessage id="banner.title1" /> 
                        <a className='font header-logo' style={{color: 'green', fontSize:'55px', textDecoration: 'none'}} href=""> Italk</a>
                    </div>
                    <div className="title2"><FormattedMessage id="banner.title2" /></div>
                    <div className="btn-item mt-4">
                        <button type="button" className="btn-log mr-4">
                            <Link to="/login" className='style-link'>
                                <FormattedMessage id="banner.login"/>
                            </Link>
                        </button>
                        <button type="button" className="btn-register">
                            <Link to="" className='style-link'>
                                <FormattedMessage id="banner.register"/>
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="container-fluid bg-content-color p-0">
                <div className="container">     
                    <div className="row">
                        {/* <div className="col-1"></div> */}
                        <div className="col-12">
                            <div className="row">
                                <div className="col-6">
                                    <p className="card-text"><a href="">TOPIC</a></p>
                                    <div className="card">
                                        <img
                                            className="card-img"
                                            src={img1}
                                            alt=""
                                        />
                                        <div className="card-content">
                                            <p className='c-content'>
                                                <BsIcons.BsArrowRight style={{fontSize: '20px', marginRight: '5px'}}/>
                                                
                                                <Link to="/topic" className='style-link'>
                                                    LEARN MORE
                                                </Link> 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <p className="card-text"><a href="">STORY</a></p>
                                    <div className="card">
                                        <img
                                            className="card-img"
                                            src={img2}
                                            alt=""
                                        />
                                        <div className="card-content">
                                            <p className='c-content'>
                                                <BsIcons.BsArrowRight style={{fontSize: '20px', marginRight: '5px'}}/>
                                                LEARN MORE
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <p className="card-text"><a href="">LISTENING</a></p>
                                    <div className="card">
                                        <img
                                            className="card-img"
                                            src={img3}
                                            alt=""
                                        />
                                        <div className="card-content">
                                            <p className='c-content'>
                                                <BsIcons.BsArrowRight style={{fontSize: '20px', marginRight: '5px'}}/>
                                                LEARN MORE 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <p className="card-text"><a href="">PRONOUNCE API</a></p>
                                    <div className="card">
                                        <img
                                            className="card-img"
                                            src={img4}
                                            alt=""
                                        />
                                        <div className="card-content">
                                            <p className='c-content'>
                                                <BsIcons.BsArrowRight style={{fontSize: '20px', marginRight: '5px'}}/>
                                                LEARN MORE
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {/* <div className="col-1"></div> */}
                </div>
            </div>
            <div className="bg-intro">
                <h2 className='intro-header'>
                    <a className='font header-logo' style={{color: 'green', fontSize: '70px', marginRight: '20px'}} href="">italk</a>
                    Gi???i ph??p h???c ti???ng Anh tr???c tuy???n cho ng?????i m???i b???t ?????u</h2>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <p className='intro-header'>B???ng c??ch ???ng d???ng c??ng ngh??? v?? c??c ph????ng ph??p h???c t???p ng??n ng??? ti??n ti???n tr??n th??? gi???i,
                        ITALK mang ?????n m???t gi???i ph??p h???c ti???ng Anh th?? v??? v?? ho??n to??n mi???n ph??</p>
                    </div>
                    <div className="col-2"></div>
                </div>
                <div className="row">
                    {/* <div className="col-2"></div> */}
        
                    <div className="col-3">
                        <img
                            className="intro-img"
                            src={img5}
                            alt=""
                        />
                        <div className="intro-content">
                            <h3 style={{marginLeft: '50px'}}>L??? tr??nh h???c ti??u chu???n</h3>
                            <p style={{marginTop: '10px', marginLeft: '50px', color: '#392e2e'}}>D???a tr??n khung ti??u chu???n CEFR gi??p ng?????i h???c ph??t tri???n kh??? n??ng h???c ti???ng 
                                m???t c??ch b??i b???n v?? khoa h???c, ph?? h???p v???i tr??nh ????? c???a m??nh</p>
                        </div>
                    </div>
        
                    <div className="col-3">
                        <img
                            className="intro-img"
                            src={img6}
                            alt=""
                        />
                        <div className="intro-content">
                            <h3>Ph????ng ph??p h???c chuy??n bi???t</h3>
                            <p style={{marginTop: '10px', color: '#392e2e'}}>M???t k??? n??ng ti???ng Anh b???n s??? ???????c ti???p c???n qua nh???ng ph????ng ph??p h???c t???p kh??c nhau,
                                c??ng v???i ???? l?? ph????ng ph??p "game h??a" gi??p vi???c h???c tr??? n??n d??? d??ng v?? th?? v???.</p>
                        </div>
                    </div>
        
                    <div className="col-3">
                        <img
                            className="intro-img"
                            src={img7}
                            alt=""
                        />
                        <div className="intro-content">
                            <h3>Ki???m tra tr??nh ????? tr?????c khi b???t ?????u</h3>
                            <p style={{marginTop: '10px', color: '#392e2e'}}>B??i ki???m tra t??nh ????? ti???ng Anh ?????u v??o gi??p b???n h???c x??c ??inh
                                v?? ????nh gi?? t???ng quan n??ng l???c ti???ng Anh c???a b???n th??n</p>
                        </div>
                    </div>
        
                    <div className="col-3" style={{marginButtom: '40px'}}>
                        <img
                            className="intro-img"
                            src={img8}
                            alt=""
                        />
                        <div className="intro-content">
                            <h3>H??? th???ng kh??a h???c ??a d???ng</h3>
                            <p style={{marginTop: '10px',  marginRight: '50px', color: '#392e2e'}}>V???i nhi???u kh??a h???c ??a d???ng gi??p b???n h???c chinh ph???c m???i m???c ti??u ti???ng Anh, 
                                c??ng nh?? ph??t tri???n, trao d???i l?????ng t??? v???ng phong ph??</p>
                        </div>
                    </div>
        
                    {/* <div className="col-2"></div> */}
                </div>
            </div>
            </div>
            </ React.Fragment>
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
    
export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
    
