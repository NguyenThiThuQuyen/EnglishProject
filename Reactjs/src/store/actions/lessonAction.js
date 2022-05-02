import { toast } from "react-toastify";
import actionTypes from './actionTypes';
import {createNewLessonService,
    getAllLessons,
    deleteLessonService,
    editLessonService,
    getLessonHomeService
 }
from "../../services/lessonService";
export const addTopicSuccess = () => ({
    type: actionTypes.ADD_LESSON_SUCCESS
})


//lesson
export const createNewLesson = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewLessonService(data);
            if(res && res.errCode === 0){
                toast.success("Create a new Lesson succeed!")
                dispatch(saveLessonSuccess());
                dispatch(fetchAllLessonsStart());
            }else{
                dispatch(saveLessonFailed());
            }
        } catch(e) {
            dispatch(saveLessonFailed());
            console.log('saveLessonFailed error', e)
        }
    }
}

export const saveLessonSuccess = () => ({
    type: actionTypes.CREATE_LESSON_SUCCESS
})

export const saveLessonFailed = () => ({
    type: actionTypes.CREATE_LESSON_FAILD
})

export const fetchAllLessonsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllLessons("ALL");
            console.log('check res fetchAllLessonsStart: ', res)

            let res1 = await getLessonHomeService('');
            console.log('check res1 get lesson: ', res1)
            if(res && res.errCode === 0){
                dispatch(fetchAllLessonsSuccess(res.lessons.reverse()))
            }else{
                toast.error("Fetch all lessons error!");
                dispatch(fetchAllLessonsFailed());
            }
        } catch(e) {
            toast.error("Fetch all lessons error!");
            dispatch(fetchAllLessonsFailed());
            console.log('fetchAllTopicsStart error', e)
        }
    }
}

export const fetchAllLessonsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_LESSONS_SUCCESS,
    lessons: data
})

export const fetchAllLessonsFailed = () => ({
    type: actionTypes.FETCH_ALL_LESSONS_FAILD
})

export const deleteALesson = (lessonId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteLessonService(lessonId);
            if(res && res.errCode === 0){
                toast.success("Delete the lesson succeed!")
                dispatch(deleteLessonSuccess())
                dispatch(fetchAllLessonsStart())
            }else{
                toast.error("Delete the lesson error!")
                dispatch(deleteLessonFailed());
            }
        } catch(e) {
            toast.error("Delete the lesson error!")
            dispatch(deleteLessonFailed());
            console.log('deleteTopicFailed error', e)
        }
    }
}

export const deleteLessonSuccess = () => ({
    type: actionTypes.FETCH_ALL_LESSONS_SUCCESS,
})

export const deleteLessonFailed = () => ({
    type: actionTypes.FETCH_ALL_LESSONS_FAILD,
})

export const editALesson = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editLessonService(data);
            if(res && res.errCode === 0){
                toast.success("Update the lesson succeed!")
                dispatch(editLessonSuccess())
                dispatch(fetchAllLessonsStart())
            }else{
                toast.error("Update the lesson error!")
                dispatch(editLessonFailed());
            }
        } catch(e) {
            toast.error("Update the lesson error!")
            dispatch(editLessonFailed());
            console.log('editTopicFailed error', e)
        }
    }
}

export const editLessonSuccess = () => ({
    type: actionTypes.EDIT_LESSON_SUCCESS,
})

export const editLessonFailed = () => ({
    type: actionTypes.EDIT_LESSON_FAILD,
})

export const fetchTopLesson = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getLessonHomeService('');
            console.log('check res lesson: ', res)
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_LESSONS_SUCCESS,
                    dataLessons: res.data
                })
            }else {
                dispatch({
                    type: actionTypes.FETCH_TOP_LESSONS_FAILD,
                })
            }

        } catch(e) {
            console.log('FETCH_TOP_LESSONS_FAILD: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_LESSONS_FAILD,
            })
        }
    }
}