import actionTypes from './actionTypes';
import {getAllCodeService,
        createNewUserService,
        getAllUsers,
        deleteUserService,
        editUserService,
     }
    from "../../services/userService";

import {createNewTopicService,
        getAllTopics,
        deleteTopicService,
        editTopicService,
        getTopicHomeService,
     }
    from "../../services/topicService";

import { toast } from "react-toastify";

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                // console.log('check get state: ', getState)
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed());
            }
        } catch(e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILD
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILD
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0){
                // console.log('check get state: ', getState)
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed());
            }
        } catch(e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error', e)
        }
    }
}

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess())
            }else{
                dispatch(saveUserFailed());
            }
        } catch(e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILD
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0){
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }else{
                toast.error("Fetch all users error!");
                dispatch(fetchAllUsersFailed());
            }
        } catch(e) {
            toast.error("Fetch all users error!");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILD
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if(res && res.errCode === 0){
                toast.success("Delete the user succeed!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                toast.error("Delete the user error!")
                dispatch(deleteUserFailed());
            }
        } catch(e) {
            toast.error("Delete the user error!")
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILD,
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                toast.success("Update the user succeed!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                toast.error("Update the user error!")
                dispatch(editUserFailed());
            }
        } catch(e) {
            toast.error("Update the user error!")
            dispatch(editUserFailed());
            console.log('editUserFailed error', e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILD,
})

//topic
export const createNewTopic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewTopicService(data);
            if(res && res.errCode === 0){
                toast.success("Create a new topic succeed!")
                dispatch(saveTopicSuccess());
                dispatch(fetchAllTopicsStart());
            }else{
                dispatch(saveTopicFailed());
            }
        } catch(e) {
            dispatch(saveTopicFailed());
            console.log('saveTopicFailed error', e)
        }
    }
}

export const saveTopicSuccess = () => ({
    type: actionTypes.CREATE_TOPIC_SUCCESS
})

export const saveTopicFailed = () => ({
    type: actionTypes.CREATE_TOPIC_FAILD
})

export const fetchAllTopicsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTopics("ALL");
            console.log('check res: ', res)

            let res1 = await getTopicHomeService('');
            console.log('check res1 get topic: ', res1)
            if(res && res.errCode === 0){
                dispatch(fetchAllTopicsSuccess(res.topics.reverse()))
            }else{
                toast.error("Fetch all topics error!");
                dispatch(fetchAllTopicsFailed());
            }
        } catch(e) {
            toast.error("Fetch all topics error!");
            dispatch(fetchAllTopicsFailed());
            console.log('fetchAllTopicsStart error', e)
        }
    }
}

export const fetchAllTopicsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_TOPICS_SUCCESS,
    topics: data
})

export const fetchAllTopicsFailed = () => ({
    type: actionTypes.FETCH_ALL_TOPICS_FAILD
})

export const deleteATopic = (topicId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteTopicService(topicId);
            if(res && res.errCode === 0){
                toast.success("Delete the topic succeed!")
                dispatch(deleteTopicSuccess())
                dispatch(fetchAllTopicsStart())
            }else{
                toast.error("Delete the topic error!")
                dispatch(deleteTopicFailed());
            }
        } catch(e) {
            toast.error("Delete the topic error!")
            dispatch(deleteTopicFailed());
            console.log('deleteTopicFailed error', e)
        }
    }
}

export const deleteTopicSuccess = () => ({
    type: actionTypes.FETCH_ALL_TOPICS_SUCCESS,
})

export const deleteTopicFailed = () => ({
    type: actionTypes.FETCH_ALL_TOPICS_FAILD,
})

export const editATopic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editTopicService(data);
            if(res && res.errCode === 0){
                toast.success("Update the topic succeed!")
                dispatch(editTopicSuccess())
                dispatch(fetchAllTopicsStart())
            }else{
                toast.error("Update the topic error!")
                dispatch(editTopicFailed());
            }
        } catch(e) {
            toast.error("Update the topic error!")
            dispatch(editTopicFailed());
            console.log('editTopicFailed error', e)
        }
    }
}

export const editTopicSuccess = () => ({
    type: actionTypes.EDIT_TOPIC_SUCCESS,
})

export const editTopicFailed = () => ({
    type: actionTypes.EDIT_TOPIC_FAILD,
})

export const fetchTopTopic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopicHomeService('2');
            console.log('check res topic: ', res)
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_TOPICS_SUCCESS,
                    dataTopics: res.data
                })
            }else {
                dispatch({
                    type: actionTypes.FETCH_TOP_TOPICS_FAILD,
                })
            }

        } catch(e) {
            console.log('FETCH_TOP_TOPICS_FAILD: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_TOPICS_FAILD,
            })
        }
    }
}