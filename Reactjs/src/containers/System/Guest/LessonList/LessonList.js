import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import './LessonList.scss';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import * as BsIcons from 'react-icons/bs';
import HomeHeader from '../../../HomePage/HomeHeader';
import Footer from '../../../HomePage/Footer';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils'

class LessonList extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrLessonLists: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topLessonListsRedux !== this.props.topLessonListsRedux){
            this.setState({
                arrLessonLists: this.props.topLessonListsRedux.data
            })
        }
    }

    componentDidMount() {
        this.props.loadTopLessonLists(this.props.match.params.id)
        // this.props.loadTopLessonLists({
        //     topicId: this.props.match.params.id,
        //     test: '1'
        // });
        this.setState({
            arrLessonLists: this.props.topLessonListsRedux
        })
        // this.props.fetchAllLessonListsStart();

    }
    hanldeOnClick(id)
    {
        if(this.props.history){
            this.props.history.push(`/lesson/${id}`)
        }
    }
    render() {
        // console.log('check topLessonListsRedux: ', this.props.topLessonListsRedux);
        let { language } = this.props
        let allLessonLists = this.state.arrLessonLists;
        console.log('check allLessonLists: ',allLessonLists);
        console.log('check 123456789: ', this.props.topLessonListsRedux)
        return (
            <div>
                <HomeHeader />
                
                <div className="container">     
                <div className="row">
                <div className="col-4"></div>
                    <div className="col-4 mt-5">
                <div className="mt-5 text-center">CHỌN LOẠI BÀI HỌC</div>
                    
                    {allLessonLists && allLessonLists.length > 0
                        && allLessonLists.map((item, index) => {

                            return(
                            <div className="card-content"  key={index}>
                                <p  className='c-content' 
                                    onClick={()=>this.hanldeOnClick(item.id)}>
                                    <div className="lessonlist">
                                        {item.name}
                                    </div>
                                </p>
                            </div>
                        )
                    })}
                    </div>
                    <div className="col-4"></div>
                </div>
                </div>
            </div>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            language: state.app.language,
            isLoggedIn: state.user.isLoggedIn,
            topLessonListsRedux: state.admin.topLessonLists
        };
    };
    
    const mapDispatchToProps = dispatch => {
        return {
            loadTopLessonLists: (topicId) => dispatch(actions.fetchTopLessonList(topicId)),
            // fetchAllLessonListsStart: () => dispatch(actions.fetchAllLessonListsStart())

            
        };
    };
    
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LessonList));