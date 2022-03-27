
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { emitter } from '../../../utils/emitter';

class ModalTopic extends Component {

    constructor(props){
        super(props);
        this.state = {
            topicName: '',
            topicImage: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                topicName: '',
                topicImage: '',
            })
        })
    }

    componentDidMount() {
        console.log('mouting modal')
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnchangeInput = (event, id) => {
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

    handleAddNewTopic = () => {
        let isValid = this.checkValidateInput();
        console.log("is valid",isValid);
        if(isValid === true) {
            //call api create modal
            this.props.createNewtopic(this.state, 'abc');
        }
    }


    render() {
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-topic-container'}
                size='md'
            >
                <ModalHeader toggle={() => {this.toggle()}}>Create a new topic</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className="row">
                            <div className="form-group col-12 mt-2">
                                <label>Topic name</label>
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
                        onClick={() => {this.handleAddNewTopic()}}>
                        Add new</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalTopic);