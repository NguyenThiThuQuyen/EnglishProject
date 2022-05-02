import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageLessonItem.scss';
import * as actions from "../../../../store/actions";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LANGUAGES } from "../../../../utils";


class TableManageLessonItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessonItemsRedux: []
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
        // console.log("delele the lessonList: ", lessonList)
        this.props.deleteALessonItem(lessonItem.id);
    }

    handleEditLessonItem = (lessonItem) => {
        console.log("edit the lessonItem: ", lessonItem)
        this.props.handleEditLessonItemFromParentKey(lessonItem)
    }

    handleOnClickLessonName = (id) => {
        this.props.fetchAllSearchVocabsStart(id)
        console.log("search: ", this.props.search)
    }

    render() {
        // console.log("check all list lesson Item 22222 : ", this.props.listLessonItems)
        
        // console.log("check state: ", this.state.usersRedux)
        let arrLessonItems = this.state.lessonItemsRedux;
        console.log("check all 2222: ", arrLessonItems)
        return (
                    <table id="TableManageLessonItem" className="table table-striped">
                         <thead className='bg-success text-white'>
                            <tr>
                                <th scope="col"><FormattedMessage id="table-lesson-item.lesson-name"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson-item.lesson-type"/></th>
                                {/* <th scope="col"><FormattedMessage id="table-lesson-item.vocab"/></th> */}
                                <th scope="col"><FormattedMessage id="table-lesson-item.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrLessonItems && arrLessonItems.length > 0 &&
                                arrLessonItems.map((item, index) => {
                                    return (
                                    <tr key = {index}>
                                        <td
                                            onClick={() => this.handleOnClickLessonName(item.lessonId)}
                                        >{item.lessonData.lessonName}
                                        </td>
                                        <td>{item.lessonListData.name}</td>
                                        {/* <td>{item.lessonData.vocabData.vocab}</td> */}
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
        );
    }

}

const mapStateToProps = state => {
    return {
        listLessonItems: state.admin.lessonLessonLists,
        search: state.admin.search,

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
