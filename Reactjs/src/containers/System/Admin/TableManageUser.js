import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LANGUAGES } from "../../../utils";


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        // console.log("delele the user: ", user)
        this.props.deleteAUserRedux(user.id);
    }

    handleEditUser = (user) => {
        // console.log("edit the user: ", user)
        this.props.handleEditUserFromParentKey(user)
    }

    

    render() {
        // console.log("check all users: ", this.props.listUsers)
        // console.log("check state: ", this.state.usersRedux)
        let arrUsers = this.state.usersRedux;
        return (
                    <table id="TableManageUser" className="table table-striped">
                         <thead className='bg-success text-white'>
                            <tr>
                                <th scope="col"><FormattedMessage id="table-user.email"/></th>
                                <th scope="col"><FormattedMessage id="table-user.firstname"/></th>
                                <th scope="col"><FormattedMessage id="table-user.lastname"/></th>
                                <th scope="col"><FormattedMessage id="table-user.address"/></th>
                                <th scope="col"><FormattedMessage id="table-user.avatar"/></th>
                                <th scope="col"><FormattedMessage id="table-user.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) => {
                                    let imageBase64 =''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')  
                                    }
                                    return (
                                    <tr key = {index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <img src={imageBase64} className='img-img' style={{width: '80px', height: '80px'}}/>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn"
                                                onClick={() => this.handleEditUser(item)}
                                            >
                                                <FontAwesomeIcon style={{color: 'blue'}} icon={faPencilAlt} />
                                            </button>
                                            <button 
                                                className="btn mx-4" 
                                                onClick={() => this.handleDeleteUser(item)}
                                            >
                                                    <FontAwesomeIcon style={{color: 'red'}} icon={faArchive} />
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
