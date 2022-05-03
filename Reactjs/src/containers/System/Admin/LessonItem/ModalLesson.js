
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../../store/actions";
import { Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { emitter } from '../../../../utils/emitter';
import { FormattedMessage } from 'react-intl';

class ModalLesson extends Component {

    constructor(props){
        super(props);
        this.state = {
            search: [],
            vocab: '',
            lessonId: ''
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                vocab: '',
            })
        })
    }

    componentDidMount() {
        console.log('mouting modal')
    }

    toggle = () => {
        this.props.toggleFromParent()
    }


    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['vocab'];
        for(let i=0; i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleOnClickLessonName = (id) => {
        this.props.fetchAllSearchVocabsStart(id)
    }

    render() {
        let searchArr = this.props.search;
        console.log('check search open modal 123 ', searchArr)
        console.log("12344", this.props.lessonId)
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                // centered
            >
                <ModalHeader toggle={() => {this.toggle()}}>VOCABULARY LIST</ModalHeader>
                <ModalBody>
                    <div className='container'>
                    <table id="TableManageLessonItem" className="table table-striped">
                         <thead className='bg-success text-white'>
                            <tr>
                            <th scope="col"><FormattedMessage id="table-vocab.vocab"/></th>
                                <th scope="col"><FormattedMessage id="table-vocab.wordmeaning"/></th>
                                <th scope="col"><FormattedMessage id="table-vocab.vocab-type"/></th>
                            </tr>
                        </thead>
                    <tbody>
                        {searchArr && searchArr.length > 0 &&
                            searchArr.map((item, index) => {
                                return (
                                    // <option key={index}>
                                    //     {item.vocab}
                                    // </option>
                                    <tr key = {index}>
                                        <td>{item.vocab}</td>                              
                                        <td>{item.vocabData.wordmeaning}</td>
                                        <td>{item.vocabData1.vocabType}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" className='px-2' onClick={() => {this.toggle()}}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        search: state.admin.search,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSearchVocabsStart: (inputId) => dispatch(actions.fetchAllSearchVocabsStart(inputId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLesson);
