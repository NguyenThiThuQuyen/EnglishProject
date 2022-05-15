import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageVocab.scss';
import * as actions from "../../../../store/actions";
import { withRouter } from 'react-router';
import {getAllLessons} from "../../../../services/lessonService"
import { getSearchVocabFromLessonService } from "../../../../services/lessonItemService"
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LANGUAGES } from "../../../../utils";


class TableManageVocab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vocabsRedux: [],
            vocabSearch: [],
            lessonName: ''
        }
    }

    async componentDidMount() {
        this.props.fetchVocabRedux();
        let vocabSearch1 = await getSearchVocabFromLessonService(this.props.match.params.id)
        console.log("long qua dep trai", vocabSearch1);

        console.log("check vocabSearch 0000", vocabSearch1.search);
        this.setState({
            vocabSearch: vocabSearch1.search
        })
        
        let lessonName = await getAllLessons(this.props.match.params.id)
        this.setState({
            lessonName: lessonName.lessons.lessonName
        })
        console.log('check name: ', lessonName)

    }

    
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.listVocabs !== this.props.listVocabs) {
        console.log("check ");
            this.setState({
                vocabsRedux: this.props.listVocabs,
            })
        }
        
        console.log("check log listVocabs: ", this.state.vocabsRedux)

    }

    handleDeleteVocab = (vocab) => {
        // console.log("delele the vocab: ", vocab)
        this.props.deleteAVocabRedux(vocab.id);
    }

    handleEditVocab = (vocab) => {
        // console.log("edit the vocab: ", vocab)
        this.props.handleEditVocabFromParentKey(vocab)
    }

    

    render() {
        // console.log("check all list vocab : ", this.props.listVocabs)
        
        let arrVocabs = this.state.vocabSearch;
        // let arrVocabs = this.state.vocabsRedux;
        console.log("check log listVocabs: ", arrVocabs)

        console.log("check all : ", arrVocabs)
        return (
                    <table id="TableManageVocab" className="table table-striped">
                         <thead className='bg-success text-white'>
                            <tr>
                                <th scope="col"><FormattedMessage id="table-vocab.lession-name"/></th>
                                <th scope="col"><FormattedMessage id="table-vocab.vocab"/></th>
                                <th scope="col"><FormattedMessage id="table-vocab.wordmeaning"/></th>
                                <th scope="col"><FormattedMessage id="table-vocab.vocab-type"/></th>
                                <th scope="col"><FormattedMessage id="table-vocab.action"/></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrVocabs && arrVocabs.length > 0 &&
                                arrVocabs.map((item, index) => {
                                    return (
                                    <tr key = {index}>
                                        <td>{item.lessonData1.lessonName}</td>
                                        <td>{item.vocab}</td>
                                        <td>{item.vocabData.wordmeaning}</td>
                                        <td>{item.vocabData1.vocabType}</td>
                                        <td>
                                            <button 
                                                className="btn"
                                                onClick={() => this.handleEditVocab(item)}
                                            >
                                                <FontAwesomeIcon style={{color: 'blue'}} icon={faPencilAlt} />
                                            </button>
                                            <button 
                                                className="btn mx-4" 
                                                onClick={() => this.handleDeleteVocab(item)}
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
        listVocabs: state.admin.vocabs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVocabRedux: () => dispatch(actions.fetchAllVocabsStart()),
        deleteAVocabRedux: (id) => dispatch(actions.deleteAVocab(id))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableManageVocab));
