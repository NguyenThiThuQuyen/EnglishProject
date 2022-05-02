import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
// import TopicManage from '../containers/System/Topic/TopicManage';
import TopicRedux from '../containers/System/Admin/Topic/TopicRedux';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import LessonListRedux from '../containers/System/Admin/LessonList/LessonListRedux';
import LessonRedux from '../containers/System/Admin/Lesson/LessonRedux';
import VocabRedux from '../containers/System/Admin/Vocab/VocabRedux';
import Header from '../containers/Header/Header';

class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/topic-redux" component={TopicRedux} />
                        <Route path="/system/lesson-list-redux" component={LessonListRedux} />
                        <Route path="/system/lesson-redux" component={LessonRedux} />
                        <Route path="/system/vocab-redux" component={VocabRedux} />
                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
