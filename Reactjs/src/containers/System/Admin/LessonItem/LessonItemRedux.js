import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './LessonItemRedux.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import 'react-image-lightbox/style.css';
import TableManageLessonItem from './TableManageLessonItem';
class LessonItemRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonListArr: [],
            lessonArr: [],
            isOpen: false,

            lessonListId: '',
            lessonId: '',

            action: '',
            lessonItemEditId: '',
        }
    }

    async componentDidMount() {
        this.props.fetchAllLessonsStart();
        this.props.fetchAllLessonListsStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.lessonItemRedux !== this.props.lessonItemRedux){
            let arrLessonLists = this.props.lessonItemRedux
            this.setState({
                lessonListArr: arrLessonLists,
                lessonListId: arrLessonLists && arrLessonLists.length > 0 ? arrLessonLists[0].id : ''
            })
        }
        if(prevProps.lessonRedux !== this.props.lessonRedux){
            let arrLessons = this.props.lessonRedux
            this.setState({
                lessonArr: arrLessons,
                lessonId: arrLessons && arrLessons.length > 0 ? arrLessons[0].id : ''
            })
        }

        if(prevProps.listLessonItems !== this.props.listLessonItems) {
            let arrLessonLists = this.props.listLessonItems;
            let arrLessons = this.props.listLessonItems;
            this.setState({
                // name: '',
                lessonList: arrLessonLists && arrLessonLists.length > 0 ? arrLessonLists[0].lessonListId: '',
                lessonId: arrLessons && arrLessons.length > 0 ? arrLessons[0].lessonId: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleSaveLessonItem = () => {
        // let isValid = this.checkValidateInput();
        // if(isValid === false) return;
        let { action } = this.state;
        if(action === CRUD_ACTIONS.CREATE){
            //fire redux create lesson list
            this.props.createNewLessonItem({
                // name: this.state.name,
                lessonListId: this.state.lessonListId,
                lessonId: this.state.lessonId,
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            //fire redux edit lesson list
            this.props.editALessonItemRedux({
                id: this.state.lessonItemEditId,
                // name: this.state.name,
                lessonListId: this.state.lessonListId,
                lessonId: this.state.lessonId,
            })
        }
        setTimeout(() => {
            this.props.fetchAllLessonItemsStart();
        }, 1000)
    }


    onChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }); 
    }

    handleEditLessonItemFromParent = (lessonItem) => {
        // console.log("check edit lesson list from parent: ", lessonItem)
        this.setState({
            // name: lessonList.name,
            lessonListId: lessonItem.lessonListId,
            lessonId: lessonItem.lessonId,
            action: CRUD_ACTIONS.EDIT,
            lessonItemEditId: lessonItem.id,
        })
    }

    render() {
        let lessonLists = this.state.lessonListArr;
        let lessons = this.state.lessonArr;
        let language = this.props.language;

        let listLessonListArr = this.props.listLessonLists
        let listLessonArr = this.props.listLessons
        let listLessonItemArr = this.props.listLessonItems

        let searchArr = this.props.search
        console.log("searchArr 11245", searchArr)

        // console.log("check listLessonItemArr 1", listLessonItemArr)
        // console.log("check listLessonListArr 2", listLessonListArr)
        // console.log("check listLessonArr 3", listLessonArr)

        let { lessonListId, lessonId } = this.state;

        return (
            <div className='lesson-list-redux-container'>
                <div className="title">
                    <FormattedMessage id="manage-lesson-item.title"/>
                </div>
                <div className="lesson-list-redux-body mt-5">
                    <div className="container">
                        <div className="row boder-container">
                            <div className="col-12"><FormattedMessage id="manage-lesson-item.add"/></div>

                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-lesson-item.lessonListId"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'lessonListId') }}
                                    value={lessonListId}
                                >
                                    {listLessonListArr && listLessonListArr.length > 0 &&
                                        listLessonListArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-lesson-item.lessonId"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'lessonId') }}
                                    value={lessonId}
                                >
                                    {listLessonArr && listLessonArr.length > 0 &&
                                        listLessonArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.lessonName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-12">
                                <button className='btn btn-danger float-right'><FormattedMessage id="manage-lesson-item.cancel"/></button>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning float-right mr-2' : 'btn btn-primary float-right mr-2'}
                                    onClick={() => this.handleSaveLessonItem()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-lesson-item.edit"/>
                                        :
                                        <FormattedMessage id="manage-lesson-item.save"/>
                                    }
                                </button>
                            </div>
                        </div>


                        

                        <div className="row">
                            <div className="col-12 my-5">
                                <TableManageLessonItem
                                    handleEditLessonItemFromParentKey={this.handleEditLessonItemFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listLessonLists: state.admin.lessonLists,
        listLessons: state.admin.lessons,
        search: state.admin.search,
        listLessonItems: state.admin.lessonLessonLists,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getTopicStart: () => dispatch(actions.fetchAllTopicsStart()),
        fetchAllLessonsStart: () => dispatch(actions.fetchAllLessonsStart()),
        fetchAllLessonListsStart: () => dispatch(actions.fetchAllLessonListsStart()),
        fetchAllLessonItemsStart: () => dispatch(actions.fetchAllLessonItemsStart()),
        createNewLessonItem: (data) => dispatch(actions.createNewLessonItem(data)),
        editALessonItemRedux: (data) => dispatch(actions.editALessonItem(data)),
        fetchAllSearchVocabsStart: (inputId) => dispatch(actions.fetchAllSearchVocabsStart(inputId)),

        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonItemRedux);
