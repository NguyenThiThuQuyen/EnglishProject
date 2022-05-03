import React, { Component } from 'react';
import { connect } from 'react-redux';
import './LessonItem.scss';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import * as BsIcons from 'react-icons/bs';
import HomeHeader from '../../../HomePage/HomeHeader';
import Footer from '../../../HomePage/Footer';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils'

class LessonItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrLessonItems: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topLessonItemsRedux !== this.props.topLessonItemsRedux){
            this.setState({
                arrLessonItems: this.props.topLessonItemsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopLessonItems();
        this.props.fetchAllLessonItemsStart();
    }

    render() {
        console.log('check topLessonItemsRedux: ', this.props.topLessonItemsRedux);
        let { language } = this.props
        let allLessonItems = this.state.arrLessonItems;
        console.log("check 123456:", allLessonItems)
        return (
            <div>
                <HomeHeader />
                {/* <div className="container">     
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            {allLessonItems && allLessonItems.length > 0
                                && allLessonItems.map((item, index) => {
                  
                                    let nameVi = `${item.lessonName}`;
                                    let nameEn = `${item.lessonName}`;
                                    return(
                                    <div className="row" key={index}>
                                  
                                        <div className="col-6 card-content">
                                            <p className='c-content'>
                                                <BsIcons.BsArrowRight style={{fontSize: '20px', marginRight: '5px'}}/>
                                                <Link to="" className='style-link'>
                                                    {language === LANGUAGES.VI ? nameVi : nameEn} 
                                                </Link> 
                                            </p>
                                        </div>
                                    </div>  
                                )
                            })}
                        </div>
                        <div className="col-3"></div>
                    </div>
                </div> */}
            </div>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            language: state.app.language,
            isLoggedIn: state.user.isLoggedIn,
            topLessonItemsRedux: state.admin.topLessonItems
        };
    };
    
    const mapDispatchToProps = dispatch => {
        return {
            loadTopLessonItems: () => dispatch(actions.fetchTopLessonItem()),
            fetchAllLessonItemsStart: () => dispatch(actions.fetchAllLessonItemsStart())
        };
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(LessonItem);