import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './VocabRedux.scss';
import { withRouter } from 'react-router';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import {getAllLessons} from "../../../../services/lessonService"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageVocab from './TableManageVocab';
class VocabRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonArr: [],
            isOpen: false,

            vocab: '',
            lessonId: '',
            wordmeaning: '',
            vocabType: '',

            action: '',
            vocabEditId: '',

            VocabRedux: '',
            lessonName: ''
        }
    }

    async componentDidMount() {
        this.props.fetchVocabRedux(this.props.match.params.id);
        // this.props.getVocabStart(this.props.match.params.id);
        this.props.getLessonStart();
        this.props.fetchAllLessonsStart();

        this.setState({
            arrLessonLists: this.props.topLessonListsRedux
        })
        // this.props.loadTopLessonLists(this.props.match.params.id)
        let lessonName = await getAllLessons(this.props.match.params.id)
        console.log('check name: ', lessonName.lessons.lessonName)
        this.setState({
            lessonName: lessonName.lessons.lessonName
        })
    } 

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listLessons !== this.props.listLessons){
            let arrLessons = this.props.listLessons
            this.setState({
                lessonArr: arrLessons,
                lessonId: this.props.match.params.id
            })
        }

        if(prevProps.listVocabs !== this.props.listVocabs) {
            let vocabArr = this.props.listVocabs;
            this.setState({
                vocab: '',
                wordmeaning: '',
                vocabType: '',
                lesson: vocabArr && vocabArr.length > 0 ? vocabArr[0].lessonId : '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }


    handleSaveVocab = () => {
        console.log("chao");
        let isValid = this.checkValidateInput();
        console.log("check isValid", isValid)
        if(isValid === false) return;
        console.log("check state handleSaveVocab", this.state)
        let { action } = this.state;

        if(action === CRUD_ACTIONS.CREATE){
            //fire redux create user
            this.props.createNewVocab({
                vocab: this.state.vocab,
                lessonId: this.state.lessonId,
                wordmeaning: this.state.wordmeaning,
                vocabType: this.state.vocabType
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            //fire redux edit user
            this.props.editAVocabRedux({
                id: this.state.vocabEditId,
                vocab: this.state.vocab,
                lessonId: this.state.lessonId,
                wordmeaning: this.state.wordmeaning,
                vocabType: this.state.vocabType
            })
        }
        setTimeout(() => {
            this.props.fetchVocabRedux();
        }, 1000)
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['vocab', 'wordmeaning', 'vocabType']
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

    handleEditVocabFromParent = (vocab) => {
        console.log("check edit", vocab)
        this.setState({
            vocab: vocab.vocab,
            lessonId: vocab.lessonId,
            wordmeaning: vocab.vocabData.wordmeaning,
            vocabType: vocab.vocabData1.vocabType,
            action: CRUD_ACTIONS.EDIT,
            vocabEditId: vocab.id,
        })
    }

    render() {
        let language = this.props.language;
        let lessons = this.state.lessonArr;
        let listLessonArr = this.props.listLessons;
        console.log("check listLessonArr 11123", listLessonArr)
        let {
            vocab, lessonId, wordmeaning, vocabType, lessonName
        } = this.state;

        console.log("listVocabs",this.props.listVocabs)
        console.log("check state: ", this.state)

        return (
            <div className='user-redux-container'>
                <div className="title">
                    <FormattedMessage id="manage-vocab.title"/>
                </div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="row boder-container">
                            <div className="col-12"><FormattedMessage id="manage-vocab.add"/></div>

                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-vocab.lessonId"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "lessonName")}}
                                    value={lessonName}
                                    disabled
                                />
                            </div>

                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-vocab.vocab"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "vocab")}}
                                    value={vocab}
                                />
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-vocab.word-meaning"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "wordmeaning")}}
                                    value={wordmeaning}
                                />
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-vocab.vocab-type"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "vocabType")}}
                                    value={vocabType}
                                />
                            </div>
                            <div className="col-12">
                                <button className='btn btn-danger float-right'><FormattedMessage id="manage-vocab.cancel"/></button>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning float-right mr-2' : 'btn btn-primary float-right mr-2'}
                                    onClick={() => this.handleSaveVocab()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-vocab.edit"/>
                                        :
                                        <FormattedMessage id="manage-vocab.save"/>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 my-5">
                                <TableManageVocab
                                    handleEditVocabFromParentKey={this.handleEditVocabFromParent}
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
        listVocabs: state.admin.vocabs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLessonStart: () => dispatch(actions.fetchAllTopicsStart()),
        // getVocabStart: () => dispatch(actions.fetchAllVocabsStart()),
        createNewVocab: (data) => dispatch(actions.createNewVocab(data)),
        fetchVocabRedux: () => dispatch(actions.fetchAllVocabsStart()),
        editAVocabRedux: (data) => dispatch(actions.editAVocab(data)),
        fetchAllLessonsStart: () => dispatch(actions.fetchAllLessonsStart())
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VocabRedux));
