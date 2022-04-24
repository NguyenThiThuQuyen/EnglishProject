import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                arrLessonLists: this.props.topLessonListsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopLessonLists();
        this.props.fetchAllLessonListsStart();

    }

    render() {
        // console.log('check topLessonListsRedux: ', this.props.topLessonListsRedux);
        let { language } = this.props
        let allLessonLists = this.state.arrLessonLists;
        console.log('check allLessonLists: ',allLessonLists);

        return (
            <div>
                <HomeHeader />
                <div className="container">     
                    {allLessonLists && allLessonLists.length > 0
                        && allLessonLists.map((item, index) => {
                            let nameVi = `${item.name}`;
                            let nameEn = `${item.name}`;
                            return(
                            <div className="card-content"  key={index}>
                                <p className='c-content'>
                                    <BsIcons.BsArrowRight style={{fontSize: '20px', marginRight: '5px'}}/>
                                    {language === LANGUAGES.VI ? nameVi : nameEn} 
                                </p>
                            </div>
                        )
                    })}
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
            loadTopLessonLists: () => dispatch(actions.fetchTopLessonList()),
            fetchAllLessonListsStart: () => dispatch(actions.fetchAllLessonListsStart())

            
        };
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(LessonList);