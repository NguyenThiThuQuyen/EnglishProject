import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageTopic.scss';
import * as actions from "../../../../store/actions";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LANGUAGES } from "../../../../utils";


class TableManageTopic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topicsRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchTopicRedux();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listTopics !== this.props.listTopics) {
            this.setState({
                topicsRedux: this.props.listTopics
            })
        }
    }

    handleDeleteTopic = (topic) => {
        this.props.deleteATopicRedux(topic.id);
    }

    handleEditTopic = (topic) => {
        this.props.handleEditTopicFromParentKey(topic)
    }

    

    render() {
        // console.log('check list topic: ', this.props.listTopics)
        // console.log('check state: ', this.state.topicsRedux)
        let arrTopics = this.state.topicsRedux;
        return (
                    <table id="TableManageUser" className="table table-striped">
                        <thead className='bg-success text-white'>
                            <tr>
                                <th scope="col"><FormattedMessage id="table-topic.topic-name"/></th>
                                <th scope="col"><FormattedMessage id="table-topic.topic-image"/></th>
                                <th scope="col"><FormattedMessage id="table-topic.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrTopics && arrTopics.length > 0 &&
                                arrTopics.map((item, index) => {
                                    let imageBase64 =''
                                    if (item.topicImage) {
                                        imageBase64 = new Buffer(item.topicImage, 'base64').toString('binary')  
                                    }
                                    return (
                                    <tr key = {index}>
                                        <td>{item.topicName}</td>
                                        <td>
                                            <img src={imageBase64} className='img-img' style={{width: '80px', height: '80px'}}/>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn"
                                                onClick={() => this.handleEditTopic(item)}
                                            >
                                                <FontAwesomeIcon style={{color: 'blue'}} icon={faPencilAlt} />
                                            </button>
                                            <button 
                                                className="btn mx-4" 
                                                onClick={() => this.handleDeleteTopic(item)}
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
        listTopics: state.admin.topics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopicRedux: () => dispatch(actions.fetchAllTopicsStart()),
        deleteATopicRedux: (id) => dispatch(actions.deleteATopic(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageTopic);
