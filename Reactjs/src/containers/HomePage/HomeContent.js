import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeContent.scss';

import * as BsIcons from 'react-icons/bs';

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
                                                LEARN MORE 
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
                    Giải pháp học tiếng Anh trực tuyến cho người mới bất đầu</h2>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <p className='intro-header'>Bằng cách ứng dụng công nghệ và các phương pháp học tập ngôn ngữ tiên tiến trên thế giới,
                        ITALK mang đến một giải pháp học tiếng Anh thú vị và hoàn toàn miễn phí</p>
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
                            <h3 style={{marginLeft: '50px'}}>Lộ trình học tiêu chuẩn</h3>
                            <p style={{marginTop: '10px', marginLeft: '50px', color: '#392e2e'}}>Dựa trên khung tiêu chuẩn CEFR giúp người học phát triển khả năng học tiếng 
                                một cách bài bản và khoa học, phù hợp với trình độ của mình</p>
                        </div>
                    </div>
        
                    <div className="col-3">
                        <img
                            className="intro-img"
                            src={img6}
                            alt=""
                        />
                        <div className="intro-content">
                            <h3>Phương pháp học chuyên biệt</h3>
                            <p style={{marginTop: '10px', color: '#392e2e'}}>Một kỹ năng tiếng Anh bạn sẽ được tiếp cận qua những phương pháp học tập khác nhau,
                                cùng với đó là phương pháp "game hóa" giúp việc học trở nên dễ dàng và thú vị.</p>
                        </div>
                    </div>
        
                    <div className="col-3">
                        <img
                            className="intro-img"
                            src={img7}
                            alt=""
                        />
                        <div className="intro-content">
                            <h3>Kiểm tra trình độ trước khi bắt đầu</h3>
                            <p style={{marginTop: '10px', color: '#392e2e'}}>Bài kiểm tra tình độ tiếng Anh đầu vào giúp bạn học xác đinh
                                và đánh giá tổng quan năng lực tiếng Anh của bản thân</p>
                        </div>
                    </div>
        
                    <div className="col-3" style={{marginButtom: '40px'}}>
                        <img
                            className="intro-img"
                            src={img8}
                            alt=""
                        />
                        <div className="intro-content">
                            <h3>Hệ thống khóa học đa dạng</h3>
                            <p style={{marginTop: '10px',  marginRight: '50px', color: '#392e2e'}}>Với nhiều khóa học đa dạng giúp bạn học chinh phục mọi mục tiêu tiếng Anh, 
                                cũng như phát triển, trao dồi lượng từ vựng phong phú</p>
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
    
