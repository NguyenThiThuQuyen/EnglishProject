import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import Footer from './Footer';

class HomePage extends Component {

    render() {
        return (
            <div>
                <HomeHeader />
                <HomeContent />
                <Footer />
            </div>

          );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
