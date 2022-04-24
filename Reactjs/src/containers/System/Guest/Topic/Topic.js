import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Topic.scss';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import * as BsIcons from 'react-icons/bs';
import HomeHeader from '../../../HomePage/HomeHeader';
import Footer from '../../../HomePage/Footer';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils'

class Topic extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrTopics: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topTopicsRedux !== this.props.topTopicsRedux){
            this.setState({
                arrTopics: this.props.topTopicsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadTopTopics();
        this.props.fetchAllTopicsStart();
        // fetchAllTopicsStart: () => dispatch(actions.fetchAllTopicsStart())

    }

    render() {
        console.log('check topTopicsRedux: ', this.props.topTopicsRedux);
        let { language } = this.props
        let allTopics = this.state.arrTopics;
        return (
            <div>
                <HomeHeader />
                <div className="container">     
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6">
                            {allTopics && allTopics.length > 0
                                && allTopics.map((item, index) => {
                                    let imageBase64 = '';
                                    // console.log('check image: ', imageBase64)
                                    if(item.topicImage){
                                        imageBase64 = new Buffer(item.topicImage, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.topicName}`;
                                    let nameEn = `${item.topicName}`;
                                    return(
                                    <div className="row" key={index}>
                                        <div className="col-6">
                                            <img
                                                className="card-img"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            />
                                        </div>
                                        <div className="col-6 card-content">
                                            <p className='c-content'>
                                                <BsIcons.BsArrowRight style={{fontSize: '20px', marginRight: '5px'}}/>
                                                <Link to="/lesson-list" className='style-link'>
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
                </div>
            </div>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            language: state.app.language,
            isLoggedIn: state.user.isLoggedIn,
            topTopicsRedux: state.admin.topTopics
        };
    };
    
    const mapDispatchToProps = dispatch => {
        return {
            loadTopTopics: () => dispatch(actions.fetchTopTopic()),
            fetchAllTopicsStart: () => dispatch(actions.fetchAllTopicsStart())

            
        };
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(Topic);