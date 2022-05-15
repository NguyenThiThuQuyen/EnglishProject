import { toast } from "react-toastify";
import actionTypes from './actionTypes';

import {
    createNewQuestionService,
    getAllQuestions,
    deleteQuestionService,
    editQuestionService,
    createChoiseAnswerService,
} from '../../services/questionService';


//lesson list
export const createNewQuestion = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewQuestionService(data);
            if(res && res.errCode === 0){
                toast.success("Create a new question succeed!")
                dispatch(saveQuestionSuccess())
            }else{
                dispatch(saveQuestionFailed());
            }
        } catch(e) {
            dispatch(saveQuestionFailed());
            console.log('saveQuestionFailed error', e)
        }
    }
}

export const saveQuestionSuccess = () => ({
    type: actionTypes.CREATE_QUESTION_SUCCESS
})

export const saveQuestionFailed = () => ({
    type: actionTypes.CREATE_QUESTION_FAILD
})

export const fetchAllQuestionsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllQuestions("ALL");
            // console.log('check res: ', res)
            // let res1 = await getQuestionHomeService('');
            // console.log('check res1 get Question: ', res1)

            if(res && res.errCode === 0){
                dispatch(fetchAllQuestionsSuccess(res.questions.reverse()))
            }else{
                toast.error("Fetch all Questions error!");
                dispatch(fetchAllQuestionsFailed());
            }
        } catch(e) {
            toast.error("Fetch all Questions error!");
            dispatch(fetchAllQuestionsFailed());
            console.log('fetchAllQuestionsStart error', e)
        }
    }
}

export const fetchAllQuestionsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_QUESTIONS_SUCCESS,
    questions: data
})

export const fetchAllQuestionsFailed = () => ({
    type: actionTypes.FETCH_ALL_QUESTIONS_FAILD
})


export const deleteAQuestion = (questionId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteQuestionService(questionId);
            if(res && res.errCode === 0){
                toast.success("Delete the Question succeed!")
                dispatch(deleteQuestionSuccess())
                dispatch(fetchAllQuestionsStart())
            }else{
                toast.error("Delete the Question error!")
                dispatch(deleteQuestionFailed());
            }
        } catch(e) {
            toast.error("Delete the Question error!")
            dispatch(deleteQuestionFailed());
            console.log('deleteLessonListFailed error', e)
        }
    }
}

export const deleteQuestionSuccess = () => ({
    type: actionTypes.FETCH_ALL_QUESTIONS_SUCCESS,
})

export const deleteQuestionFailed = () => ({
    type: actionTypes.FETCH_ALL_QUESTIONS_FAILD,
})

export const editAQuestion = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editQuestionService(data);
            if(res && res.errCode === 0){
                toast.success("Update the Question succeed!")
                dispatch(editQuestionSuccess())
                dispatch(fetchAllQuestionsStart())
            }else{
                toast.error("Update the Question error!")
                dispatch(editQuestionFailed());
            }
        } catch(e) {
            toast.error("Update the Question error!")
            dispatch(editQuestionFailed());
            console.log('editLessonListFailed error', e)
        }
    }
}

export const editQuestionSuccess = () => ({
    type: actionTypes.FETCH_ALL_QUESTIONS_SUCCESS,
})

export const editQuestionFailed = () => ({
    type: actionTypes.FETCH_ALL_QUESTIONS_FAILD,
})


// export const fetchTopLessonList = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getLessonListHomeService('');
//             console.log('check res lesson list: ', res)
//             if(res && res.errCode === 0){
//                 dispatch({
//                     type: actionTypes.FETCH_TOP_LESSON_LISTS_SUCCESS,
//                     dataLessonLists: res.data
//                 })
//             }else {
//                 dispatch({
//                     type: actionTypes.FETCH_TOP_LESSON_LISTS_FAILD,
//                 })
//             }

//         } catch(e) {
//             console.log('FETCH_TOP_LESSON_LISTS_FAILD: ', e)
//             dispatch({
//                 type: actionTypes.FETCH_TOP_LESSON_LISTS_FAILD,
//             })
//         }
//     }
// }


export const createChoiseAnswer = (inputData) => {
    return async (dispatch, getState) => {
        try {
            let res = await createChoiseAnswerService(inputData);
            // console.log('check createChoiseAnswer : ', res)
            // let res1 = await getQuestionHomeService('');
            // console.log('check res1 get Question: ', res1)

            if(res){
                dispatch(createChoiseAnswerSuccess(res))
            }else{
                // toast.error("Fetch all Questions error!");
                dispatch(createChoiseAnswerFailed());
            }
        } catch(e) {
            // toast.error("Fetch all Questions error!");
            dispatch(createChoiseAnswerFailed());
            console.log('createChoiseAnswer error', e)
        }
    }
}

export const createChoiseAnswerSuccess = (data) => ({
    type: actionTypes.CREATE_CHOISE_ANSWER_SUCCESS,
    data: data
})

export const createChoiseAnswerFailed = () => ({
    type: actionTypes.CREATE_CHOISE_ANSWER_FAILD
})