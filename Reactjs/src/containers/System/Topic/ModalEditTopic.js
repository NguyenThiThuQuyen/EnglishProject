
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import _, { isBuffer } from 'lodash';
class ModalEditTopic extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            topicName: '',
            topicImage: '',
        }
    }

    componentDidMount() {
        let topic = this.props.currentTopic;
        // let {currentTopic} = this.props
        // check topic is empty
        if(topic && !_.isEmpty(topic)) {
            this.setState({
                id: topic.id,
                topicName: topic.topicName,
                topicImage: topic.topicImage,
            })
        }
        console.log('didmout edit modal', this.props.currentTopic)
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnchangeInput = (event, id) => {
        // console.log('event: ',event.target.value, id)
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }); 
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['topicName', 'topicImage'];
        for(let i=0; i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveTopic = () => {
        let isValid = this.checkValidateInput();
        console.log("is valid",isValid);
        if(isValid === true) {
            //call api create modal
            this.props.editTopic(this.state);
        }
    }



    render() {
        // console.log('check props from parent', this.props);
        // console.log('check child open modal ', this.isOpen)
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-topic-container'}
                size='md'
                // centered
            >
                <ModalHeader toggle={() => {this.toggle()}}>Edit an topic</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className="row">
                            <div className="form-group col-12 mt-2">
                                <label>Tên chủ đề</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.handleOnchangeInput(event, "topicName")}}
                                    value={this.state.topicName}
                                />
                            </div>
                            <div className="form-group col-12 mt-2">
                                <label>Hình ảnh</label>
                                <div className="custom-icon">
                                    <input
                                        className="form-control" 
                                        type='text'
                                        onChange={(event) => {this.handleOnchangeInput(event, "topicImage")}}
                                        value={this.state.topicImage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary" 
                        className='px-2' 
                        onClick={() => {this.handleSaveTopic()}}>
                        Save changes</Button>
                    <Button color="danger" className='px-2' onClick={() => {this.toggle()}}>Close</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditTopic);
