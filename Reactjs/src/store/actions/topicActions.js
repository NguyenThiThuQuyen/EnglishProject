import { toast } from "react-toastify";
import actionTypes from './actionTypes';
import {createNewTopicService,
    getAllTopics,
    deleteTopicService,
    editTopicService,
    getTopicHomeService,
 }
from "../../services/topicService";
export const addTopicSuccess = () => ({
    type: actionTypes.ADD_TOPIC_SUCCESS
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
            // console.log('check res: ', res)

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
            let res = await getTopicHomeService('');
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