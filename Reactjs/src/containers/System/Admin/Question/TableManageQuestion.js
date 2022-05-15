import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageQuestion.scss';
import { withRouter } from 'react-router';
import * as actions from "../../../../store/actions";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LANGUAGES } from "../../../../utils";


class TableManageQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchAllQuestionsStart();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.questions !== this.props.questions) {
            this.setState({
                questionRedux: this.props.questions
            })
        }
    }

    handleDeleteQuestion = (questionId) => {
        this.props.deleteAQuestion(questionId.id);
    }

    handleEditQuestion = (data) => {
        console.log("edit the question: ", data)
        this.props.handleEditQuestionFromParentKey(data)
    }


    render() {
        // console.log('check list topic: ', this.props.listTopics)
        let arrQuestionRedux = this.state.questionRedux;
        console.log('check state: ', arrQuestionRedux)
        return (
                    <table id="TableManageQuestion" className="table table-striped">
                        <thead className='bg-success text-white'>
                            <tr>
                                <th scope="col"><FormattedMessage id="table-question.question"/></th>
                                <th scope="col"><FormattedMessage id="table-question.vocab"/></th>
                                <th scope="col"><FormattedMessage id="table-question.wrong1"/></th>
                                <th scope="col"><FormattedMessage id="table-question.wrong2"/></th>
                                <th scope="col"><FormattedMessage id="table-question.wrong3"/></th>
                                <th scope="col"><FormattedMessage id="table-question.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrQuestionRedux && arrQuestionRedux.length > 0 &&
                                arrQuestionRedux.map((item, index) => {
                                    return (
                                    <tr key = {index}>
                                        <td>
                                                {item.question}
                                        </td>
                                        <td>
                                                {item.answerTrue}
                                        </td>
                                        <td>
                                                {item.answerFalse1}
                                        </td>
                                        <td>
                                                {item.answerFalse2}
                                        </td>
                                        <td>
                                                {item.answerFalse3}
                                        </td>
                                        <td>
                                            <button 
                                                className="btn"
                                                onClick={() => this.handleEditQuestion(item)}
                                            >
                                                <FontAwesomeIcon style={{color: 'blue'}} icon={faPencilAlt} />
                                            </button>
                                            <button 
                                                className="btn mx-4" 
                                                onClick={() => this.handleDeleteQuestion(item)}
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
        questions: state.admin.questions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllQuestionsStart: () => dispatch(actions.fetchAllQuestionsStart()),
        editAQuestion: (data) => dispatch(actions.editAQuestion(data)),
        deleteAQuestion: (questionId) => dispatch(actions.deleteAQuestion(questionId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableManageQuestion));
