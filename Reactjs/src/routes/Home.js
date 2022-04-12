import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/user-manage' : '/home';

        return (
            <React.Fragment>
                <Redirect to={linkToRedirect} />
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
