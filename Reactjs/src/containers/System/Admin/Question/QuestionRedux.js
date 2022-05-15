import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './QuestionRedux.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import { withRouter } from 'react-router';
import { getAllLessons } from '../../../../services/lessonService';
import { getAllLessonLists } from '../../../../services/lessonListService';
import { getAllTopics } from '../../../../services/topicService';
import { getSearchVocabFromLessonService } from "../../../../services/lessonItemService"
import { createChoiseAnswerService } from "../../../../services/questionService"
import { getAllVocabs } from "../../../../services/vocabService"
import { getAllVocabsFromLessonId } from "../../../../services/vocabService"
import * as actions from "../../../../store/actions";
import 'react-image-lightbox/style.css';
import TableManageQuestion from './TableManageQuestion';
// import TableManageQuestion from './TableManageQuestion';
class QuestionRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lessonItemsRedux: [],
            lessonArr: [],
            search: [],
            vocabNameArr: [],
            vocab: '',

            vocabId: '',

            question: '',
            answerTrue: '',
            answerFalse1: '',
            answerFalse2: '',
            answerFalse3: '',
            lesson: '',

            lessonId: '',
            isOpen: false,

            searchLessonId: '',

            lessonName: '',

            lessonListName: '',

            topicName: '',

            action: '',
            questionEditId: '',
            answerTrueArr: [],
            answerFalse1Arr: [],
            answerFalse2Arr: [],
            answerFalse3Arr: [],

        }
    }

    async componentDidMount() {
        // this.props.loadTopLessonLists(this.props.match.params.id)
        this.props.fetchAllQuestionsStart(this.props.match.params.id)

        this.props.fetchAllLessonsStart();
        this.props.fetchAllLessonItemsStart();

        this.props.fetchAllSearchWordMeaningToVocabsStart(32);

        let lessonName = await getAllLessons(this.props.match.params.id)
        let lessonListName = await getAllLessonLists(this.props.match.params.lessonlistId)
        let topicName = await getAllTopics(this.props.match.params.topicId)
        let vocabName = await getSearchVocabFromLessonService(this.props.match.params.id)
        console.log("check vocabName",vocabName.search[0].vocab)
        this.setState({
            lessonId: this.props.match.params.lessonlistId
        })
        this.setState({
            lessonName: lessonName.lessons.lessonName,
            lessonListName: lessonListName.lessonLists.name,
            topicName: topicName.topics.topicName,

            vocabNameArr: vocabName.search,

        })
        this.props.fetchAllSearchVocabsStart(this.props.match.params.id);
        this.props.fetchAllLessonListsStart()
        this.state.answerTrue =  vocabName.search[0].vocab // gán mặc định answerTrue
         let mangtemp = await createChoiseAnswerService({
            lessonId: this.props.match.params.id,
            answerTrue: this.state.answerTrue
        })
        this.setState({
            answerFalse1Arr : mangtemp
        })

        console.log("check mangtemp", mangtemp[0]);
        
        this.state.answerFalse1 = mangtemp[0].vocab
        let mangtemp1 = await createChoiseAnswerService({
            lessonId: this.props.match.params.id,
            answerTrue: this.state.answerTrue,
            answerFalse1: this.state.answerFalse1
        })
        this.setState({
            answerFalse2Arr : mangtemp1
        })

        this.state.answerFalse2 = mangtemp1[0].vocab
        let mangtemp2 = await createChoiseAnswerService({
            lessonId: this.props.match.params.id,
            answerTrue: this.state.answerTrue,
            answerFalse1: this.state.answerFalse1,
            answerFalse2: this.state.answerFalse2,

        })
        this.setState({
            answerFalse3Arr : mangtemp2
        })
    }

   async componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listLessons !== this.props.listLessons){
            let arrLessons = this.props.listLessons
            // console.log("check arrLessons: ", arrLessons);
            this.setState({
                lessonArr: arrLessons,
                // lessonId: arrLessons && arrLessons.length > 0 ? arrLessons[0].id : '',
                action: CRUD_ACTIONS.CREATE,
            })
        }

        if(prevProps.listQuestions !== this.props.listQuestions) {
            let questionArr = this.props.listQuestions;
            this.setState({
                questionArr: questionArr,
                question: '',
                answerTrue: '',
                answerFalse1: '',
                answerFalse2: '',
                answerFalse3: '',
                // lessonId: questionArr && questionArr.length > 0 ? questionArr[0].lessonId: '',
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
                question: this.state.question,
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
                question: this.state.question,
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

    handleOnclickanswerTrue = async () => 
    {
        this.props.fetchAllSearchWordMeaningToVocabsStart(this.state.answerTrue)
        let mangtemp = []
        mangtemp = await createChoiseAnswerService({
            lessonId: this.props.match.params.id,
            answerTrue: this.state.answerTrue
        })
        // console.log("check this.state.answerTrue 111111111111111111111",this.state.answerTrue)
        this.setState({
            answerFalse1Arr : mangtemp
        })
    }

    
    handleOnclickanswerFalse1 = async () =>
    {
        let mangtemp = []
        mangtemp = await createChoiseAnswerService({
            lessonId: this.props.match.params.id,
            answerTrue: this.state.answerTrue,
            answerFalse1: this.state.answerFalse1
        })

        this.setState({
            answerFalse2Arr : mangtemp
        })
    }
    handleOnclickanswerFalse2 = async () =>
    {
        let mangtemp = []
        mangtemp = await createChoiseAnswerService({
            lessonId: this.props.match.params.id,
            answerTrue: this.state.answerTrue,
            answerFalse1: this.state.answerFalse1,
            answerFalse2: this.state.answerFalse2,
        })
        this.setState({
            answerFalse3Arr : mangtemp
        })
    }
    render() {
        let arr = this.state.vocabNameArr;
        console.log("check arr: ", arr);

        let arrLessonItems = this.state.lessonItemsRedux;
        // console.log("check all 2222: ", arrLessonItems);

        let listLessonArr = this.props.listLessons


        // this.state.lessonId = this.props.temp

        let {
            lessonId,
            lessonName,
            lessonListName,
            topicName, 
            question, 
            answerTrue,
            answerFalse1,
            answerFalse2,
            answerFalse3
        } = this.state;

        let searchVocabArr = this.props.search
        let listLessonListsArr = this.props.listLessonLists
        // console.log("check state:", this.state);
        let vocabArr = this.props.vocabArr
        console.log("vocabArr", vocabArr);
        let answerTrueArr = this.state.answerTrueArr
        // console.log("check answerTrueArr",answerTrueArr);
        let answerFalse1Arr = this.state.answerFalse1Arr
        let answerFalse2Arr = this.state.answerFalse2Arr
        let answerFalse3Arr = this.state.answerFalse3Arr

        console.log("check state", this.state);

        let searchWordMeaning = this.props.searchWordMeaning
        console.log("searchWordMeaning", searchWordMeaning);
        return (
            <div className='lesson-list-redux-container'>
                <div className="title">
                    <FormattedMessage id="manage-question.title"/>
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
                                <label><FormattedMessage id="manage-question.language-type"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "lessonListName")}}
                                    value={lessonListName}
                                    disabled
                                />
                            </div>

                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-question.topic"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "topicName")}}
                                    value={topicName}
                                    disabled
                                />
                            </div>

                            {/* <div className="form-group col-4 mt-2">
                            <label><FormattedMessage id="manage-question.vocab"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'answerTrue') }}
                                    onClick={(event) => {this.handleOnclickanswerTrue()}}
                                    value={answerTrue}
                                >
                                    {arr && arr.length > 0 &&
                                        arr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.vocab}>
                                                    {item.vocab}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div> */}

                            <div className="form-group col-4 mt-2">
                            <label><FormattedMessage id="manage-question.vocab"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'answerTrue') }}
                                    onClick={(event) => {this.handleOnclickanswerTrue()}}
                                    value={answerTrue}
                                >
                                    {arr && arr.length > 0 &&
                                        arr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.vocab}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="form-group col-8 mt-2">
                            <label><FormattedMessage id="manage-question.vocab"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'question') }}
                                    // onClick={(event) => {this.handleOnclickanswerTrue()}}
                                    value={question}
                                >
                                    {arr && arr.length > 0 &&
                                        arr.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.vocabData.wordmeaning}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            {/* <div className="form-group col-8 mt-2">
                                <label><FormattedMessage id="manage-question.question"/></label>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "question")}}
                                    value={question}
                                />
                            </div> */}

                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-question.answer-false1"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'answerFalse1') }}
                                    onClick={(event) => {this.handleOnclickanswerFalse1()}}
                                    value={answerFalse1}
                                >
                                    {answerFalse1Arr && answerFalse1Arr.length > 0 &&
                                        answerFalse1Arr.map((item, index) => {                                           
                                            return (
                                                <option key={index} value={item.vocab}>
                                                    {item.vocab}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-question.answer-false2"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'answerFalse2') }}
                                    onClick={(event) => {this.handleOnclickanswerFalse2()}}
                                    value={answerFalse2}
                                >
                                    {answerFalse2Arr && answerFalse2Arr.length > 0 &&
                                        answerFalse2Arr.map((item, index) => {                                           
                                            return (
                                                <option key={index} value={item.vocab}>
                                                    {item.vocab}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-question.answer-false3"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'answerFalse3') }}
                                    // onClick={(event) => {this.handleOnclickanswerFalse3()}}
                                    value={answerFalse3}
                                >
                                    {answerFalse3Arr && answerFalse3Arr.length > 0 &&
                                        answerFalse3Arr.map((item, index) => {                                           
                                            return (
                                                <option key={index} value={item.vocab}>
                                                    {item.vocab}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>



                            <div className="col-12">
                                <button className='btn btn-danger float-right'><FormattedMessage id="manage-lesson-item.cancel"/></button>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning float-right mr-2' : 'btn btn-primary float-right mr-2'}
                                    onClick={() => this.handleSaveQuestion()}
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
                                <TableManageQuestion
                                    handleEditQuestionFromParentKey={this.handleEditQuestionFromParent}
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
        listLessons: state.admin.lessons,
        listQuestions: state.admin.questions,
        search: state.admin.search,
        listLessonItems: state.admin.lessonLessonLists,
        listLessonLists: state.admin.lessonLists,
        vocabArr : state.admin.vocabArr,
        searchWordMeaning : state.admin.searchWordMeaning,
        

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
        createNewQuestion: (data) => dispatch(actions.createNewQuestion(data)),
        createChoiseAnswer: (data) => dispatch(actions.createChoiseAnswer(data)),

        fetchAllSearchWordMeaningToVocabsStart: (inputId) => dispatch(actions.fetchAllSearchWordMeaningToVocabsStart(inputId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(QuestionRedux));
