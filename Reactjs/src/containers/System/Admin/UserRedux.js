import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './UserRedux.scss'
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getRoleStart();
        // this.props.dispatch(actions.getGenderStart())
        // try {
        //     let res = await getAllCodeService('gender');
        //     if(res && res.errCode === 0){
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log('check res: ', res)
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        if(prevProps.roleRedux !== this.props.roleRedux){
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    render() {
        console.log('check 11111: ', this.state)
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;
        console.log('check state component: ', this.state)
        return (
            <div className='user-redux-container'>
                <div className="title">
                    User Redux hoi dan it "Youtube Channel"
                </div>
                <div className="user-redux-body mt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12"><FormattedMessage id="manage-user.add"/></div>
                            <div className='col-12'>
                                {isGetGenders === true ? 'Loading genders': ''}
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-user.email"/></label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    // onChange={(event) => {this.handleOnchangeInput(event, "email")}}
                                    // value={this.state.email}
                                />
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-user.password"/></label>
                                <div className="custom-icon">
                                    <input
                                        className="form-control" 
                                        type='password'
                                        // onChange={(event) => {this.handleOnchangeInput(event, "password")}}
                                        // value={this.state.password}
                                    />
                                </div>
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-user.firstname"/></label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    // onChange={(event) => {this.handleOnchangeInput(event, "firstName")}}
                                    // value={this.state.firstName}
                                />
                            </div>
                            <div className="form-group col-6 mt-2">
                                <label><FormattedMessage id="manage-user.lastname"/></label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    // onChange={(event) => {this.handleOnchangeInput(event, "lastName")}}
                                    // value={this.state.lastName}
                                />
                            </div>
                            <div className="form-group col-12 mt-2">
                                <label><FormattedMessage id="manage-user.address"/></label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    // onChange={(event) => {this.handleOnchangeInput(event, "address")}}
                                    // value={this.state.address}
                                />
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-user.gender"/></label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group col-4 mt-2">
                                <label><FormattedMessage id="manage-user.role"/></label>
                                <select className='form-control'>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index}>
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
                                <button className='btn btn-primary float-right mr-2'><FormattedMessage id="manage-user.save"/></button>
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
        isLoadingGender: state.admin.isLoadingGender
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
