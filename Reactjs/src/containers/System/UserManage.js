import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useStore } from 'react-redux';
import './UserManage.scss';
import {getAllUsers, createNewUserService, deleteUserService, editUserService} from '../../services/userService';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from "../../utils/emitter";


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
        // console.log('get user from node.js : ', response)
    }

    getAllUsersFromReact = async() => {
        let response = await getAllUsers('ALL');
        if(response && response.errCode == 0){
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewuser = async(data) => {
        try{
            let response = await createNewUserService(data)
            if(!response && response.errCode !== 0){
                alert(response.errMessage)
            }else{
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', {'id': 'your id'})
            }
        }catch(e){
            console.log(e)
        }
    }

    handleDeleteUser = async(user) => {
        console.log('click delete', user)
        try{
            let res = await deleteUserService(user.id);
            if(res && res.errCode === 0){
                await this.getAllUsersFromReact();
            }else {
                alert(res.errMessage)
            }
        }catch(e) {
            console.log(e)
        }
    }

    handleEditUser = (user) => {
        console.log('check edit user', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async(user) => {
        try{
            let res = await editUserService(user)
            // console.log('click save user', res);
            if(res && res.errCode === 0){
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsersFromReact()
            }else {
                alert(res.errCode)
            }
        }catch(e) {
            console.log(e)
        }
    }

    render() {
        // console.log('check render ', this.state)
        let arrUsers = this.state.arrUsers;
        console.log(arrUsers)
        return (
            <div className="container">
                <ModalUser 
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewuser={this.createNewuser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser 
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent = {this.toggleUserEditModal}
                        currentUser = {this.state.userEdit}
                        editUser = {this.doEditUser}
                    />
                }
                
                <div className="title text-center">
                USER MANAGEMENT
                </div>
                <div className="mx-1">
                    <button 
                        className='btn btn-primary px-2'
                        onClick={() => this.handleAddNewUser()}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add new user
                    </button>
                </div>
                <div className="users-table mt-5">
                    <table className="table">
                    <tbody>
                        {/* <thead> */}
                            <tr className='bg-user'>
                            <th scope="col">Email</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                            </tr>
                        {/* </thead> */}
                   
                                {arrUsers && arrUsers.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>  
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className="btn" onClick={() => this.handleEditUser(item)}><FontAwesomeIcon style={{color: 'blue'}} icon={faPencilAlt} /></button>
                                                    <button className="btn mx-4" onClick={() => this.handleDeleteUser(item)}><FontAwesomeIcon style={{color: 'red'}} icon={faArchive} /></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
