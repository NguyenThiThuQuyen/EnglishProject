import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './QuestionRedux.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import { withRouter } from 'react-router';
import { getAllLessons } from '../../../../services/lessonService';
import { getAllLessonLists } from '../../../../services/lessonListService';
import { getAllTopics } from '../../../../services/topicService';
import * as actions from "../../../../store/actions";
import 'react-image-lightbox/style.css';
// import TableManageQuestion from './TableManageQuestion';
class QuestionRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonItemsRedux: [],
            lessonArr: [],
            search: [],
            vocab: '',

            isOpen: false,

            searchLessonId: '',
            lessonId: '',
            question: '',

            lessonName: '',

            lessonListName: '',

            topicName: '',

            action: '',
            questionEditId: '',
        }
    }

    async componentDidMount() {
        // this.props.loadTopLessonLists(this.props.match.params.id)
        this.props.fetchAllQuestionsStart(this.props.match.params.id)

        this.props.fetchAllLessonsStart();
        this.props.fetchAllLessonItemsStart();

        let lessonName = await getAllLessons(this.props.match.params.id)
        let lessonListName = await getAllLessonLists(this.props.match.params.lessonlistId)
        let topicName = await getAllTopics(this.props.match.params.topicId)
        console.log("check lessonListName 123: ", lessonListName)
        console.log("check topicName 123: ", topicName)
        this.setState({
            lessonName: lessonName.lessons.lessonName,
            lessonListName: lessonListName.lessonLists.name,
            topicName: topicName.topics.topicName


        })
        console.log('check lessonName: ', lessonName)

        this.props.fetchAllSearchVocabsStart(this.props.match.params.id);

        this.props.fetchAllLessonListsStart()

    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listLessons !== this.props.listLessons){
            let arrLessons = this.props.listLessons
            this.setState({
                lessonArr: arrLessons,
                lessonId: arrLessons && arrLessons.length > 0 ? arrLessons[0].id : ''
            })
        }

        if(prevProps.listLessonItems !== this.props.listLessonItems) {
            this.setState({
                lessonItemsRedux: this.props.listLessonItems
            })
        }

        if(prevProps.listQuestions !== this.props.listQuestions) {
            let questionArr = this.props.listQuestions;
            this.setState({
                answerTrue: '',
                answerFalse1: '',
                answerFalse2: '',
                answerFalse3: '',
                question: questionArr && questionArr.length > 0 ? questionArr[0].lessonId: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleSaveQuestion = () => {
        // let isValid = this.checkValidateInput();
        // if(isValid === false) return;
        let { action } = this.state;
        if(action === CRUD_ACTIONS.CREATE){
            //fire redux create lesson list
            this.props.createNewQuestion({
                answerTrue: this.state.answerTrue,
                answerFalse1: this.state.answerFalse1,
                answerFalse2: this.state.answerFalse2,
                answerFalse3: this.state.answerFalse3,
                lessonId: this.state.lessonId,
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            //fire redux edit lesson list
            this.props.editAQuestionRedux({
                id: this.state.questionEditId,
                answerTrue: this.state.answerTrue,
                answerFalse1: this.state.answerFalse1,
                answerFalse2: this.state.answerFalse2,
                answerFalse3: this.state.answerFalse3,
                lessonId: this.state.lessonId,
            })
        }
        setTimeout(() => {
            this.props.fetchAllQuestionsStart();
        }, 1000)
    }


    onChangeInput = (event, id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }); 
    }

    handleEditQuestionFromParent = (question) => {
        // console.log("check edit lesson list from parent: ", question)
        this.setState({
            answerTrue: question.answerTrue,
            answerFalse1: question.answerFalse1,
            answerFalse2: question.answerFalse2,
            answerFalse3: question.answerFalse3,
            lessonId: question.lessonId,

            action: CRUD_ACTIONS.EDIT,
            questionEditId: question.id,
        })
    }

    render() {
        let arrLessonItems = this.state.lessonItemsRedux;
        console.log("check all 2222: ", arrLessonItems);

        let listLessonArr = this.props.listLessons


        this.state.lessonId = this.props.temp
        let {lessonId, lessonName, lessonListName, topicName } = this.state;
        console.log("helllllllllllllll", this.props)
        // console.log("helllllllllllllll", this.props.searchLessonId)

        let searchVocabArr = this.props.search
        let listLessonListsArr = this.props.listLessonLists

        console.log("check listLessonListsArr", listLessonListsArr)
        console.log("check searchVocabArr", searchVocabArr)

        console.log("check listLessonArr 3", listLessonArr)


        return (
            <div className='lesson-list-redux-container'>
                <div className="title">
                    <FormattedMessage id="manage-lesson-item.title"/>
                </div>
                <div className="lesson-list-redux-body mt-5">
                    <div className="container">
                        <div className="row boder-container">
                            <div className="col-12"><FormattedMessage id="manage-question.add"/></div>

                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-question.lesson-name"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "lessonName")}}
                                    value={lessonName}
                                    disabled
                                />
                            </div>

                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-question.lesson-name"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "lessonListName")}}
                                    value={lessonListName}
                                    disabled
                                />
                            </div>

                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-question.lesson-name"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "topicName")}}
                                    value={topicName}
                                    disabled
                                />
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
                
                        {/* <div className="row">
                            <div className="col-12 my-5">
                                <TableManageLessonItem
                                    handleEditLessonItemFromParentKey={this.handleEditLessonItemFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listLessons: state.admin.lessons,
        // searchLessonId: state.admin.lessons,
        search: state.admin.search,
        listLessonItems: state.admin.lessonLessonLists,
        listLessonLists: state.admin.lessonLists,
        

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllLessonsStart: () => dispatch(actions.fetchAllLessonsStart()),

        fetchAllLessonListsStart: () => dispatch(actions.fetchAllLessonListsStart()),
        fetchAllLessonItemsStart: () => dispatch(actions.fetchAllLessonItemsStart()),
        createNewLessonItem: (data) => dispatch(actions.createNewLessonItem(data)),
        editALessonItemRedux: (data) => dispatch(actions.editALessonItem(data)),

        fetchAllSearchVocabsStart: (inputId) => dispatch(actions.fetchAllSearchVocabsStart(inputId)),

        fetchAllQuestionsStart: () => dispatch(actions.fetchAllQuestionsStart()),

        

        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionRedux));
