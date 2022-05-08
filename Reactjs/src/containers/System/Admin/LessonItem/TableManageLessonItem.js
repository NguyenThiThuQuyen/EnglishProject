import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageLessonItem.scss';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import * as actions from "../../../../store/actions";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalLesson from "./ModalLesson"
import QuestionRedux from '../Question/QuestionRedux';

import { LANGUAGES } from "../../../../utils";


class TableManageLessonItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessonItemsRedux: [],
            isOpenModalLesson: false,
            lessonId: '',
            searchLessonId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllLessonItemsStart();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listLessonItems !== this.props.listLessonItems) {
            this.setState({
                lessonItemsRedux: this.props.listLessonItems
            })
        }
    }

    handleDeleteLessonItem = (lessonItem) => {
        this.props.deleteALessonItem(lessonItem.id);
    }

    handleEditLessonItem = (lessonItem) => {
        console.log("edit the lessonItem: ", lessonItem)
        this.props.handleEditLessonItemFromParentKey(lessonItem)
    }

    handleOnClickLessonName = (id) => {
        this.props.fetchAllSearchVocabsStart(id)
        console.log("search: ", this.props.search)
        this.setState({
            isOpenModalLesson: true,
            lessonId: id
        })
    }

    handleOnClickLessonNameFromQueson = ( lessonId, lessonListData, topicData) => {
        console.log("check push: ", )
        if(this.props.history){
            this.props.history.push(`/system/question-redux/${lessonId}/${lessonListData}/${topicData}`)
        }
    }

    toggleLessonModal = () => {
        this.setState({
            isOpenModalLesson: !this.state.isOpenModalLesson,
        })
    }

    render() {
        let arrLessonItems = this.state.lessonItemsRedux;
        console.log("check this.state.searchLessonId", this.state.searchLessonId)
        let searchLessonId = this.state.searchLessonId
        console.log("check all 2222: ", arrLessonItems);
        return (
            <div>
                <ModalLesson 
                    isOpen={this.state.isOpenModalLesson}
                    toggleFromParent = {this.toggleLessonModal}
                    lessonId = {this.state.lessonId}
                />
                {/* <div className="" hidden> */}
                    {/* <QuestionRedux 
                        temp = {searchLessonId}
                    /> */}
                {/* </div> */}
                    <table id="TableManageLessonItem" className="table table-striped">
                         <thead className='bg-success text-white'>
                            <tr>
                                <th scope="col"><FormattedMessage id="table-lesson-item.question"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson-item.lesson-name"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson-item.lesson-type"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson-item.topic"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson-item.detail"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson-item.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrLessonItems && arrLessonItems.length > 0 &&
                                arrLessonItems.map((item, index) => {
                                    console.log("item", item)
                                    return (
                                    <tr key = {index}>
                                        <td>
                                            <button className='btn btn-warning'
                                            onClick={() => this.handleOnClickLessonNameFromQueson(
                                                item.lessonId,
                                                item.lessonListData.id,
                                                item.lessonListData.topicData.id
                                                 )}
                                            >
                                                <b><FormattedMessage id="table-lesson-item.create-question"/></b>
                                            </button>
                                        </td>
                                        <td>
                                            {item.lessonData.lessonName}
                                        </td>
                                        <td>{item.lessonListData.name}</td>
                                        <td>{item.lessonListData.topicData.topicName}</td>
                                        <td
                                            onClick={() => this.handleOnClickLessonName(item.lessonId)}
                                        >
                                            <button className='btn btn-primary'>
                                                <FormattedMessage id="table-lesson-item.view-detail"/>
                                            </button>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn"
                                                onClick={() => this.handleEditLessonItem(item)}
                                            >
                                                <FontAwesomeIcon style={{color: 'blue'}} icon={faPencilAlt} />
                                            </button>
                                            <button 
                                                className="btn mx-4" 
                                                onClick={() => this.handleDeleteLessonItem(item)}
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
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listLessonItems: state.admin.lessonLessonLists,
        // search: state.admin.search,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllLessonItemsStart: () => dispatch(actions.fetchAllLessonItemsStart()),
        deleteALessonItem: (id) => dispatch(actions.deleteALessonItem(id)),
        fetchAllSearchVocabsStart: (inputId) => dispatch(actions.fetchAllSearchVocabsStart(inputId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableManageLessonItem));
