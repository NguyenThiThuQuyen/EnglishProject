import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageLessonList.scss';
import * as actions from "../../../../store/actions";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LANGUAGES } from "../../../../utils";


class TableManageLessonList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessonlistsRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchLessonListRedux();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listLessonLists !== this.props.listLessonLists) {
            this.setState({
                lessonlistsRedux: this.props.listLessonLists
            })
        }
    }

    handleDeleteLessonList = (lessonList) => {
        // console.log("delele the lessonList: ", lessonList)
        this.props.deleteALessonListRedux(lessonList.id);
    }

    handleEditLessonList = (lessonList) => {
        // console.log("edit the lessonList: ", lessonList)
        this.props.handleEditLessonListFromParentKey(lessonList)
    }

    

    render() {
        console.log("check all list lesson : ", this.props.listLessonLists)
        // console.log("check state: ", this.state.usersRedux)
        let arrLessonLists = this.state.lessonlistsRedux;
        return (
                    <table id="TableManageLessonList" className="table table-striped">
                         <thead className='bg-success text-white'>
                            <tr>
                                <th scope="col"><FormattedMessage id="table-lesson-list.name"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson-list.topicId"/></th>
                                <th scope="col"><FormattedMessage id="table-lesson-list.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrLessonLists && arrLessonLists.length > 0 &&
                                arrLessonLists.map((item, index) => {
                                    return (
                                    <tr key = {index}>
                                        <td>{item.name}</td>
                                        <td>{item.topicId}</td>
                                        <td>
                                            <button 
                                                className="btn"
                                                onClick={() => this.handleEditLessonList(item)}
                                            >
                                                <FontAwesomeIcon style={{color: 'blue'}} icon={faPencilAlt} />
                                            </button>
                                            <button 
                                                className="btn mx-4" 
                                                onClick={() => this.handleDeleteLessonList(item)}
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
        listLessonLists: state.admin.lessonLists
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLessonListRedux: () => dispatch(actions.fetchAllLessonListsStart()),
        deleteALessonListRedux: (id) => dispatch(actions.deleteALessonList(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageLessonList);
