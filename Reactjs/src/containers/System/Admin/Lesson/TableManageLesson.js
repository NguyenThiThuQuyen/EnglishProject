import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageLesson.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../../store/actions";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LANGUAGES } from "../../../../utils";


class TableManageLesson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonsRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchLessonRedux();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listLessons !== this.props.listLessons) {
            this.setState({
                lessonsRedux: this.props.listLessons
            })
        }
    }

    handleDeleteLesson = (lesson) => {
        this.props.deleteALessonRedux(lesson.id);
    }

    handleEditLesson = (lesson) => {
        console.log("edit the lesson: ", lesson)
        this.props.handleEditLessonFromParentKey(lesson)
    }

    handleOnClickLesson(lesson) {
        console.log("check push: ", )
        if(this.props.history){
            this.props.history.push(`/system/vocab-redux/${lesson}`)
        }
    }



    render() {
        // console.log('check list topic: ', this.props.listTopics)
        // console.log('check state: ', this.state.topicsRedux)
        let arrLessons = this.state.lessonsRedux;
        return (
                    <table id="TableManageLesson" className="table table-striped">
                        <thead className='bg-success text-white'>
                            <tr>
                                <th scope="col"><FormattedMessage id="table-lesson.lesson-name"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson.lesson-image"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrLessons && arrLessons.length > 0 &&
                                arrLessons.map((item, index) => {
                                    let imageBase64 =''
                                    if (item.lessonImage) {
                                        imageBase64 = new Buffer(item.lessonImage, 'base64').toString('binary')  
                                    }
                                    return (
                                    <tr key = {index}>
                                        <td>
                                            <button className='btn btn-primary'
                                                onClick={() => this.handleOnClickLesson(item.id)}
                                            >
                                                {item.lessonName}
                                            </button>
                                        </td>

                                        <td>
                                            <img src={imageBase64} className='img-img' style={{width: '100px', height: '80px'}}/>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn"
                                                onClick={() => this.handleEditLesson(item)}
                                            >
                                                <FontAwesomeIcon style={{color: 'blue'}} icon={faPencilAlt} />
                                            </button>
                                            <button 
                                                className="btn mx-4" 
                                                onClick={() => this.handleDeleteLesson(item)}
                                            >
                                                    <FontAwesomeIcon style={{color: 'red'}} icon={faArchive} />
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listLessons: state.admin.lessons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLessonRedux: () => dispatch(actions.fetchAllLessonsStart()),
        deleteALessonRedux: (id) => dispatch(actions.deleteALesson(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableManageLesson));
