import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './LessonListRedux.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import 'react-image-lightbox/style.css';
import TableManageLessonList from './TableManageLessonList';
class LessonListRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topicArr: [],
            isOpen: false,

            name: '',
            topicId: '',

            action: '',
            lessonListEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getTopicStart();
        this.props.getLessonListStart();
        this.props.fetchLessonListRedux();

    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topicRedux !== this.props.topicRedux){
            let arrTopics = this.props.topicRedux
            this.setState({
                topicArr: arrTopics,
                topic: arrTopics && arrTopics.length > 0 ? arrTopics[0].topicId : ''
            })
        }

        if(prevProps.listLessonLists !== this.props.listLessonLists) {
            let arrTopics = this.props.topicRedux;
            this.setState({
                name: '',
                topicId: arrTopics && arrTopics.length > 0 ? arrTopics[0].topicId : '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleSaveLessonList = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;
        let { action } = this.state;

        if(action === CRUD_ACTIONS.CREATE){
            //fire redux create lesson list
            this.props.createNewLessonList({
                name: this.state.name,
                topicId: this.state.topicId,
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            //fire redux edit lesson list
            this.props.editALessonListRedux({
                id: this.state.lessonListEditId,
                name: this.state.name,
                topicId: this.state.topicId,
            })
        }
        // this.props.fetchUserRedux();
        setTimeout(() => {
            this.props.fetchLessonListRedux();
        }, 1000)
        
    }


    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name']
        for(let i=0; i<arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('This input is required:' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }); 
    }

    handleEditLessonListFromParent = (lessonList) => {
        console.log("check edit lesson list from parent: ", lessonList)
        this.setState({
            name: lessonList.name,
            topicId: lessonList.topicId,
            action: CRUD_ACTIONS.EDIT,
            lessonListEditId: lessonList.id,
        })
    }

    render() {
        let topics = this.state.topicArr;
        let language = this.props.language;
        let isGetTopics = this.props.isLoadingTopic;
        let listTopicArr = this.props.listTopics
        console.log("check listTopicArr", listTopicArr)

        let { name } = this.state;

        return (
            <div className='lesson-list-redux-container'>
                <div className="title">
                    Lesson List Redux
                </div>
                <div className="lesson-list-redux-body mt-5">
                    <div className="container">
                        <div className="row boder-container">
                            <div className="col-12"><FormattedMessage id="manage-lesson-list.add"/></div>
                            <div className='col-12'>
                                {isGetTopics === true ? 'Loading topics': ''}
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-lesson-list.name"/></label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(event) => {this.onChangeInput(event, "name")}}
                                    value={name}
                                />
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-lesson-list.topicId"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'topicId') }}
                                >
                                    {listTopicArr && listTopicArr.length > 0 &&
                                        listTopicArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.topicName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-12">
                                <button className='btn btn-danger float-right'><FormattedMessage id="manage-lesson-list.cancel"/></button>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning float-right mr-2' : 'btn btn-primary float-right mr-2'}
                                    onClick={() => this.handleSaveLessonList()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-lesson-list.edit"/>
                                        :
                                        <FormattedMessage id="manage-lesson-list.save"/>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 my-5">
                                <TableManageLessonList
                                    handleEditLessonListFromParentKey={this.handleEditLessonListFromParent}
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
        listTopics: state.admin.topics,
        listLessonLists: state.admin.lessonLists,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopicStart: () => dispatch(actions.fetchAllTopicsStart()),
        getLessonListStart: () => dispatch(actions.fetchAllLessonListsStart()),
        createNewLessonList: (data) => dispatch(actions.createNewLessonList(data)),
        fetchLessonListRedux: () => dispatch(actions.fetchAllLessonListsStart()),
        editALessonListRedux: (data) => dispatch(actions.editALessonList(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonListRedux);
