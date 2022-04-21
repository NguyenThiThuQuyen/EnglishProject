import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './UserRedux.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,


            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            gender: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })

        }

        if(prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
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
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar:base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if(isValid === false) return;
        let { action } = this.state;

        if(action === CRUD_ACTIONS.CREATE){
            //fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                avatar: this.state.avatar
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
            //fire redux edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.role,
                avatar: this.state.avatar
            })
        }
        // this.props.fetchUserRedux();
        setTimeout(() => {
            this.props.fetchUserRedux();
        }, 1000)
        
    }


    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address']
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

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        // console.log("check edit user from parent: ", user)
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        }, () => {
            console.log("check base64: ", this.state)
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        let {
            email, password, firstName, lastName,
            address, gender, role, avatar
        } = this.state;

        return (
            <div className='user-redux-container'>
                <div className="title">
                    User Redux
                </div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="row boder-container">
                            <div className="col-12"><FormattedMessage id="manage-user.add"/></div>
                            <div className='col-12'>
                                {isGetGenders === true ? 'Loading genders': ''}
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    onChange={(event) => {this.onChangeInput(event, "email")}}
                                    value={email}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <div className="custom-icon">
                                    <input
                                        className="form-control" 
                                        type='password'
                                        onChange={(event) => {this.onChangeInput(event, "password")}}
                                        value={password}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-user.firstname"/></label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(event) => {this.onChangeInput(event, "firstName")}}
                                    value={firstName}
                                />
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-user.lastname"/></label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(event) => {this.onChangeInput(event, "lastName")}}
                                    value={lastName}
                                />
                            </div>
                            <div className="form-group col-12 mt-2">
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(event) => {this.onChangeInput(event, "address")}}
                                    value={address}
                                />
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className='form-control'
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}
                                >
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-user.image"/></label>
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
                                <button className='btn btn-danger float-right'><FormattedMessage id="manage-user.cancel"/></button>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning float-right mr-2' : 'btn btn-primary float-right mr-2'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit"/>
                                        :
                                        <FormattedMessage id="manage-user.save"/>
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 my-5">
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
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
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
