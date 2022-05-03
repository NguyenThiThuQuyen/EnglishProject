import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageLessonItem.scss';
import * as actions from "../../../../store/actions";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalLesson from "./ModalLesson"

import { LANGUAGES } from "../../../../utils";


class TableManageLessonItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessonItemsRedux: [],
            isOpenModalLesson: false,
            lessonId: ''
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

    toggleLessonModal = () => {
        this.setState({
            isOpenModalLesson: !this.state.isOpenModalLesson,
        })
    }

    render() {
        let arrLessonItems = this.state.lessonItemsRedux;
        console.log("check all 2222: ", arrLessonItems)
        // console.log("check all 333: ", listLessonItems)
        return (
            <div>
                <ModalLesson 
                    isOpen={this.state.isOpenModalLesson}
                    toggleFromParent = {this.toggleLessonModal}
                    lessonId = {this.state.lessonId}
                    // createNewuser={this.createNewuser}
                />
                    <table id="TableManageLessonItem" className="table table-striped">
                         <thead className='bg-success text-white'>
                            <tr>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageLessonItem);
