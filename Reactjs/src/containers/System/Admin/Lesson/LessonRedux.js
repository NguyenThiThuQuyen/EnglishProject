import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './LessonRedux.scss';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageLesson from './TableManageLesson';
class LessonRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            isOpen: false,

            lessonName: '',
            lessonImage: '',
            topicId: '',

            action: '',
            lessonEditId: '',
            lessonListId: '',

            lessonRedux: ''
        }
    }

    async componentDidMount() {
        this.props.fetchLessonRedux();
        this.props.fetchAllTopicsStart();
        this.props.fetchAllLessonListsStart();

        this.props.fetchAllSearchTopicsStart(4);

    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listLessons !== this.props.listLessons) {
            // topicRedux: this.props.listTopics,
            this.setState({
                lessonName: '',
                lessonImage: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }

    handleOnchangeImage = async(event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            // console.log('check image: ', base64)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                lessonImage:base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveLesson = () => {
        console.log("chao");
        let isValid = this.checkValidateInput();
        console.log("check isValid", isValid)
        if(isValid === false) return;
        console.log("check state handleSaveLesson", this.state)
        let { action } = this.state;

        if(action === CRUD_ACTIONS.CREATE){
            //fire redux create user
            this.props.createNewLesson({
                lessonName: this.state.lessonName,
                lessonImage: this.state.lessonImage,
                lessonListId: this.state.lessonListId
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            //fire redux edit user
            this.props.editALessonRedux({
                id: this.state.lessonEditId,
                lessonName: this.state.lessonName,
                lessonImage: this.state.lessonImage,
                lessonListId: this.state.lessonListId

            })
        }
        //this.props.fetchUserRedux();
        setTimeout(() => {
            this.props.fetchLessonRedux();
        }, 1000)
        
    }

    handleEditLessonFromParent = (lesson) => {
        let imageBase64 = '';
        if(lesson.lessonImage){
            imageBase64 = new Buffer(lesson.lessonImage, 'base64').toString('binary');
        }
        console.log("check edit lesson list from parent: ", lesson)
        this.setState({
            lessonName: lesson.lessonName,
            lessonImage: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            lessonEditId: lesson.id,
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['lessonName']
        for(let i=0; i<arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('This input is required:' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }

    onClickTopic = () => {
        this.props.fetchAllSearchTopicsStart(this.state.topicId)
    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }); 
    }

    render() {
        let language = this.props.language;
        let {
            lessonName, lessonImage, lessonListId, topicId
        } = this.state;

        let listLessonListsArr = this.props.searchLessonList
        let listTopicsArr = this.props.listTopics
        console.log("check state: ", this.state);


        
        return (
            <div className='user-redux-container'>
                <div className="title">
                    Lesson
                </div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="row boder-container">
                            <div className="col-12"><FormattedMessage id="manage-lesson.add"/></div>

                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-lesson.topic"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'topicId') }}
                                    onClick = {(event) => {this.onClickTopic()}}
                                    value={topicId}
                                >
                                    {listTopicsArr && listTopicsArr.length > 0 &&
                                        listTopicsArr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.topicName}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-lesson.lessonlist"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'lessonListId') }
                                }
                                value={lessonListId}
                                >
                                    {listLessonListsArr && listLessonListsArr.length > 0 &&
                                        listLessonListsArr.map((item, index) => {
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
                                <label><FormattedMessage id="manage-lesson.lesson-name"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "lessonName")}}
                                    value={lessonName}
                                />
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-lesson.lesson-image"/></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type="file" hidden 
                                        onChange = {(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor="previewImg">
                                        Tải ảnh 
                                        <FontAwesomeIcon style={{  marginLeft: "6px" }} icon={ faUpload  } />
                                    </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={()=> this.openPreviewImage()}
                                    >
                                    </div>
                                </div>                            
                            </div>


                            <div className="col-12">
                                <button className='btn btn-danger float-right'><FormattedMessage id="manage-lesson.cancel"/></button>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning float-right mr-2' : 'btn btn-primary float-right mr-2'}
                                    onClick={() => this.handleSaveLesson()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-lesson.edit"/>
                                        :
                                        <FormattedMessage id="manage-lesson.save"/>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 my-5">
                                <TableManageLesson
                                    handleEditLessonFromParentKey={this.handleEditLessonFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {this.state.isOpen === true && 
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listLessons: state.admin.lessons,
        listLessonLists: state.admin.lessonLists,
        listTopics: state.admin.topics,

        searchLessonList: state.admin.searchLessonList,

        

    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewLesson: (data) => dispatch(actions.createNewLesson(data)),
        fetchLessonRedux: () => dispatch(actions.fetchAllLessonsStart()),
        fetchAllTopicsStart: () => dispatch(actions.fetchAllTopicsStart()),
        fetchAllLessonListsStart: () => dispatch(actions.fetchAllLessonListsStart()),
        editALessonRedux: (data) => dispatch(actions.editALesson(data)),
        fetchAllSearchTopicsStart: (inputId) => dispatch(actions.fetchAllSearchTopicsStart(inputId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LessonRedux);
