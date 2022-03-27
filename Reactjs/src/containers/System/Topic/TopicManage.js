import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useStore } from 'react-redux';
import './TopicManage.scss';
import {getAllTopics,createNewTopicService, editTopicService, deleteTopicService} from '../../../services/topicService';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalTopic from './ModalTopic';
import ModalEditTopic from './ModalEditTopic';
import { emitter } from "../../../utils/emitter";


class TopicManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTopics: [],
            isOpenModalTopic: false,
            isOpenModalEditTopic: false,
            topicEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllTopicsFromReact();
    }

    getAllTopicsFromReact = async() => {
        let response = await getAllTopics('ALL');
        if(response && response.errCode == 0){
            this.setState({
                arrTopics: response.topics
            })
        }
    }

    handleAddNewTopic = () => {
        this.setState({
            isOpenModalTopic: true,
        })
    }

    toggleTopicModal = () => {
        this.setState({
            isOpenModalTopic: !this.state.isOpenModalTopic,
        })
    }
    
    toggleTopicEditModal = () => {
        this.setState({
            isOpenModalEditTopic: !this.state.isOpenModalEditTopic,
        })
    }

    createNewtopic = async(data) => {
        try{
            let response = await createNewTopicService(data)
            if(!response && response.errCode !== 0){
                alert(response.errMessage)
            }else{
                await this.getAllTopicsFromReact();
                this.setState({
                    isOpenModalTopic: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id': 'your id'})
            }
        }catch(e){
            console.log(e)
        }
    }

    handleDeleteTopic = async(topic) => {
        console.log('click delete', topic)
        try{
            let res = await deleteTopicService(topic.id);
            if(res && res.errCode === 0){
                await this.getAllTopicsFromReact();
            }else {
                alert(res.errMessage)
            }
        }catch(e) {
            console.log(e)
        }
    }

    handleEditTopic = (topic) => {
        console.log('check edit topic', topic);
        this.setState({
            isOpenModalEditTopic: true,
            topicEdit: topic
        })
    }

    doEditTopic = async(topic) => {
        try{
            let res = await editTopicService(topic)
            // console.log('click save topic', res);
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditTopic: false
                })
                await this.getAllTopicsFromReact()
            }else {
                alert(res.errCode)
            }
        }catch(e) {
            console.log(e)
        }
    }

    render() {
        // console.log('check render ', this.state)
        let arrTopics = this.state.arrTopics;
        console.log(arrTopics)
        return (
            <div className="container">
                <ModalTopic 
                    isOpen={this.state.isOpenModalTopic}
                    toggleFromParent = {this.toggleTopicModal}
                    createNewtopic={this.createNewtopic}
                />
                {
                    this.state.isOpenModalEditTopic &&
                    <ModalEditTopic 
                        isOpen={this.state.isOpenModalEditTopic}
                        toggleFromParent = {this.toggleTopicEditModal}
                        currentTopic = {this.state.topicEdit}
                        editTopic = {this.doEditTopic}
                    />
                }
                
                <div className="title text-center">
                    Manage topics with Tui
                </div>
                <div className="mx-1">
                    <button 
                        className='btn btn-primary px-2'
                        onClick={() => this.handleAddNewTopic()}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add new topic
                    </button>
                </div>
                <div className="topics-table mt-5">
                    <table className="table">
                    <tbody>
                        {/* <thead> */}
                            <tr className='bg-primary'>
                            <th scope="col">Topic name</th>
                            <th scope="col">Topic image</th>
                            <th scope="col">Action</th>
                            </tr>
                        {/* </thead> */}
                   
                                {arrTopics && arrTopics.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.topicName}</td>
                                                <td>{item.topicImage}</td>
                                                <td>
                                                    <button className="btn" onClick={() => this.handleEditTopic(item)}><FontAwesomeIcon style={{color: 'blue'}} icon={faPencilAlt} /></button>
                                                    <button className="btn mx-4" onClick={() => this.handleDeleteTopic(item)}><FontAwesomeIcon style={{color: 'red'}} icon={faArchive} /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicManage);
