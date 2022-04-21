import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Topic.scss';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../../HomePage/HomeHeader';
import Footer from '../../../HomePage/Footer';
import * as actions from '../../../../store/actions'

class Topic extends Component {

    componentDidMount() {
        this.props.loadTopTopics();
        this.props.fetchAllTopicsStart();
        // fetchAllTopicsStart: () => dispatch(actions.fetchAllTopicsStart())

    }

    render() {
        console.log('check topTopicsRedux: ', this.props.topTopicsRedux);
        return (
            <div>
                <HomeHeader />

                {/* <Footer /> */}
            </div>
            );
        }
    }

    const mapStateToProps = state => {
        return {
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
    
