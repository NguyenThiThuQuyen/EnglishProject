import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Lesson.scss';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import * as BsIcons from 'react-icons/bs';
import HomeHeader2 from '../../../HomePage/HomeHeader2';
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

        if(this.props.match.params.id)
        {
            console.log("truyền được rồi", this.props.match.params.id)
        }
    }

    componentDidMount() {
        this.props.loadTopLessons();
        this.props.fetchAllLessonsStart();
        // fetchAllLessonsStart: () => dispatch(actions.fetchAllLessonsStart())
        this.props.fetchAllLessonItemsFromLessonlistIdStart(this.props.match.params.id)
    }
    hanldeOnClick(id) {
        if(this.props.history){
            this.props.history.push(`/question/${id}`)
        }
    }
    render() {
        // console.log('check topLessonsRedux: ', this.props.topLessonsRedux);
        let { language } = this.props
        let allLessons = this.props.LessonItemsFromLessonlistId;
        console.log("check allLessons", allLessons);
        return (
            <div>
                <HomeHeader2 />
                <div className="container-fluid bg-lesson">     
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            {allLessons && allLessons.length > 0
                                && allLessons.map((item, index) => {
                                    let imageBase64 = '';
                                    // console.log('check image: ', imageBase64)
                                    if(item.lessonData.lessonImage){
                                        imageBase64 = new Buffer(item.lessonData.lessonImage, 'base64').toString('binary');
                                    }
                                    console.log("check base", imageBase64)
                                    let nameVi = `${item.lessonData.lessonName}`;
                                    let nameEn = `${item.lessonData.lessonName}`;
                                    return(
                                    <div className="row mt-5 bg-lesson-content" key={index}>
                                        <div className="col-4">
                                            <img
                                                className="card-img"
                                               src={imageBase64}
                                            />
                                        </div>
                                        <div className="col-8 card-content">
                                            <p className='c-content'
                                                onClick={()=> this.hanldeOnClick(item.id)}
                                            >
                                                <BsIcons.BsArrowRight style={{fontSize: '20px', marginRight: '5px'}}/>
                                                {language === LANGUAGES.VI ? nameVi : nameEn} 

                                                {/* <Link to="/question" className='style-link'>
                                                </Link>  */}
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
            topLessonsRedux: state.admin.topLessons,
            LessonItemsFromLessonlistId: state.admin.LessonItemsFromLessonlistId,
        };
    };
    
    const mapDispatchToProps = dispatch => {
        return {
            loadTopLessons: () => dispatch(actions.fetchTopLesson()),
            fetchAllLessonsStart: () => dispatch(actions.fetchAllLessonsStart()),
            fetchAllLessonItemsFromLessonlistIdStart: (id) => dispatch(actions.fetchAllLessonItemsFromLessonlistIdStart(id)),
            
        };
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(Lesson);