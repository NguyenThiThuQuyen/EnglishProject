
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _, { isBuffer } from 'lodash';
class ModalEditUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        // let {currentUser} = this.props
        // check user is empty
        if(user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
        console.log('didmout edit modal', this.props.currentUser)
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

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        console.log("is valid",isValid);
        if(isValid === true) {
            //call api create modal
            this.props.editUser(this.state);
        }
    }



    render() {
        // console.log('check props from parent', this.props);
        // console.log('check child open modal ', this.isOpen)
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={() => {this.toggle()}} 
                className={'modal-user-container'}
                size='lg'
                // centered
            >
                <ModalHeader toggle={() => {this.toggle()}}>Edit an user</ModalHeader>
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
                                    disabled
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
                                        disabled
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
                        onClick={() => {this.handleSaveUser()}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
