import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './TopicRedux.scss';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageTopic from './TableManageTopic';
class TopicRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            isOpen: false,

            topicName: '',
            topicImage: '',

            action: '',
            topicEditId: '',

            topicRedux: ''
        }
    }

    async componentDidMount() {
        this.props.fetchTopicRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listTopics !== this.props.listTopics) {
            // topicRedux: this.props.listTopics,
            this.setState({
                topicName: '',
                topicImage: '',
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
                topicImage:base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveTopic = () => {
        console.log("chao");
        let isValid = this.checkValidateInput();
        console.log("check isValid", isValid)
        if(isValid === false) return;
        console.log("check state handleSaveTopic", this.state)
        let { action } = this.state;

        if(action === CRUD_ACTIONS.CREATE){
            //fire redux create user
            this.props.createNewTopic({
                topicName: this.state.topicName,
                topicImage: this.state.topicImage
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            //fire redux edit user
            this.props.editATopicRedux({
                id: this.state.topicEditId,
                topicName: this.state.topicName,
                topicImage: this.state.topicImage
            })
        }
        //this.props.fetchUserRedux();
        setTimeout(() => {
            this.props.fetchTopicRedux();
        }, 1000)
        
    }


    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['topicName']
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

    handleEditTopicFromParent = (topic) => {
        let imageBase64 = '';
        if(topic.topicImage){
            imageBase64 = new Buffer(topic.topicImage, 'base64').toString('binary');
        }
        this.setState({
            topicName: topic.topicName,
            topicImage: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            topicEditId: topic.id,
        }, () => {
            console.log("check base64: ", this.state)
        })
    }

    render() {
        console.log("check state", this.state)
        let language = this.props.language;
        let {
            topicName, topicImage
        } = this.state;
        console.log("listTopics",this.props.listTopics)
        return (
            <div className='user-redux-container'>
                <div className="title">
                    Topic
                </div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="row boder-container">
                            <div className="col-12"><FormattedMessage id="manage-topic.add"/></div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-topic.topic-name"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "topicName")}}
                                    value={topicName}
                                />
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-topic.topic-image"/></label>
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
                                <button className='btn btn-danger float-right'><FormattedMessage id="manage-topic.cancel"/></button>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning float-right mr-2' : 'btn btn-primary float-right mr-2'}
                                    onClick={() => this.handleSaveTopic()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-topic.edit"/>
                                        :
                                        <FormattedMessage id="manage-topic.save"/>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 my-5">
                                <TableManageTopic
                                    handleEditTopicFromParentKey={this.handleEditTopicFromParent}
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
        listTopics: state.admin.topics

    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewTopic: (data) => dispatch(actions.createNewTopic(data)),
        fetchTopicRedux: () => dispatch(actions.fetchAllTopicsStart()),
        editATopicRedux: (data) => dispatch(actions.editATopic(data))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicRedux);
