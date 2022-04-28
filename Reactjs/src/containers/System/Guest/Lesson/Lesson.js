import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Lesson.scss';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import * as BsIcons from 'react-icons/bs';
import HomeHeader from '../../../HomePage/HomeHeader';
import Footer from '../../../HomePage/Footer';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils'

class Lesson extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrLessons: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topLessonsRedux !== this.props.topLessonsRedux){
            this.setState({
                arrLessons: this.props.topLessonsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopLessons();
        this.props.fetchAllLessonsStart();
        // fetchAllLessonsStart: () => dispatch(actions.fetchAllLessonsStart())

    }

    render() {
        console.log('check topLessonsRedux: ', this.props.topLessonsRedux);
        let { language } = this.props
        let allLessons = this.state.arrLessons;
        return (
            <div>
                <HomeHeader />
                <div className="container">     
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            {allLessons && allLessons.length > 0
                                && allLessons.map((item, index) => {
                                    let imageBase64 = '';
                                    // console.log('check image: ', imageBase64)
                                    if(item.lessonImage){
                                        imageBase64 = new Buffer(item.lessonImage, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.lessonName}`;
                                    let nameEn = `${item.lessonName}`;
                                    return(
                                    <div className="row" key={index}>
                                        <div className="col-6">
                                            <img
                                                className="card-img"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            />
                                        </div>
                                        <div className="col-6 card-content">
                                            <p className='c-content'>
                                                <BsIcons.BsArrowRight style={{fontSize: '20px', marginRight: '5px'}}/>
                                                <Link to="" className='style-link'>
                                                    {language === LANGUAGES.VI ? nameVi : nameEn} 
                                                </Link> 
                                            </p>
                                        </div>
                                    </div>  
                                )
                            })}
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div>
            </div>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            language: state.app.language,
            isLoggedIn: state.user.isLoggedIn,
            topLessonsRedux: state.admin.topLessons
        };
    };
    
    const mapDispatchToProps = dispatch => {
        return {
            loadTopLessons: () => dispatch(actions.fetchTopLesson()),
            fetchAllLessonsStart: () => dispatch(actions.fetchAllLessonsStart())

            
        };
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(Lesson);