
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
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
        // console.log('event: ',event.target.value, id)
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }); 
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for(let i=0; i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        console.log("is valid",isValid);
        if(isValid === true) {
            //call api create modal
            this.props.createNewuser(this.state, 'abc');
        }
    }


    render() {
        // console.log('check child props', this.props);
        // console.log('check child open modal ', this.isOpen)
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                // centered
            >
                <ModalHeader toggle={() => {this.toggle()}}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className="row">
                            <div className="form-group col-6 mt-2">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.handleOnchangeInput(event, "email")}}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label>Password</label>
                                <div className="custom-icon">
                                    <input
                                        className="form-control" 
                                        type='password'
                                        onChange={(event) => {this.handleOnchangeInput(event, "password")}}
                                        value={this.state.password}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label>First name</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(event) => {this.handleOnchangeInput(event, "firstName")}}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label>Last name</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(event) => {this.handleOnchangeInput(event, "lastName")}}
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className="form-group col-12 mt-2">
                                <label>Address</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(event) => {this.handleOnchangeInput(event, "address")}}
                                    value={this.state.address}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="primary" 
                        className='px-2' 
                        onClick={() => {this.handleAddNewUser()}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
