import { toast } from "react-toastify";
import actionTypes from './actionTypes';

import {createNewLessonItemService,
    getAllLessonItems,
    editLessonItemService,
    deleteLessonItemService,
    getSearchVocabFromLessonService
} from '../../services/lessonItemService';


//search
export const fetchAllSearchVocabsStart = (inputId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getSearchVocabFromLessonService(inputId);
            console.log('check res fetchAllSearchVocabsStart: ', res)
            // let res1 = await getLessonItemHomeService('');
            // console.log('check res1 get lesson item: ', res1)

            if(res && res.errCode === 0){
                dispatch(fetchAllSearchVocabsSuccess(res.search))
            }else{
                toast.error("Fetch all lesson items error!");
                dispatch(fetchAllSearchVocabsFailed());
            }
        } catch(e) {
            toast.error("Fetch all lesson items error!");
            dispatch(fetchAllSearchVocabsFailed());
            console.log('fetchAllLessonItemsFailed error', e)
        }
    }
}

export const fetchAllSearchVocabsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SEARCH_VOCABS_SUCCESS,
    search: data
})

export const fetchAllSearchVocabsFailed = () => ({
    type: actionTypes.FETCH_ALL_SEARCH_VOCABS_FAILD
})

//lesson item
export const createNewLessonItem = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewLessonItemService(data);
            if(res && res.errCode === 0){
                toast.success("Create a new lesson item succeed!")
                dispatch(saveLessonItemSuccess())
            }else{
                dispatch(saveLessonItemFailed());
            }
        } catch(e) {
            dispatch(saveLessonItemFailed());
            console.log('saveLessonItemFailed error', e)
        }
    }
}

export const saveLessonItemSuccess = () => ({
    type: actionTypes.CREATE_LESSON_ITEM_SUCCESS
})

export const saveLessonItemFailed = () => ({
    type: actionTypes.CREATE_LESSON_ITEM_FAILD
})

export const fetchAllLessonItemsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllLessonItems("ALL");
            // console.log('check res: ', res)
            // let res1 = await getLessonItemHomeService('');
            // console.log('check res1 get lesson item: ', res1)

            if(res && res.errCode === 0){
                dispatch(fetchAllLessonItemsSuccess(res.lessonLessonLists.reverse()))
            }else{
                toast.error("Fetch all lesson items error!");
                dispatch(fetchAllLessonItemsFailed());
            }
        } catch(e) {
            toast.error("Fetch all lesson items error!");
            dispatch(fetchAllLessonItemsFailed());
            console.log('fetchAllLessonItemsFailed error', e)
        }
    }
}

export const fetchAllLessonItemsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_LESSON_ITEMS_SUCCESS,
    lessonLessonLists: data
})

export const fetchAllLessonItemsFailed = () => ({
    type: actionTypes.FETCH_ALL_LESSON_ITEMS_FAILD
})


export const deleteALessonItem = (lessonItemId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteLessonItemService(lessonItemId);
            if(res && res.errCode === 0){
                toast.success("Delete the lesson item succeed!")
                dispatch(deleteLessonItemSuccess())
                dispatch(fetchAllLessonItemsStart())
            }else{
                toast.error("Delete the lesson Item error!")
                dispatch(deleteLessonItemFailed());
            }
        } catch(e) {
            toast.error("Delete the lesson Item error!")
            dispatch(deleteLessonItemFailed());
            console.log('deleteLessonItemFailed error', e)
        }
    }
}

export const deleteLessonItemSuccess = () => ({
    type: actionTypes.FETCH_ALL_LESSON_ITEMS_SUCCESS,
})

export const deleteLessonItemFailed = () => ({
    type: actionTypes.FETCH_ALL_LESSON_ITEMS_FAILD,
})

export const editALessonItem = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editLessonItemService(data);
            if(res && res.errCode === 0){
                toast.success("Update the lesson Item succeed!")
                dispatch(editLessonItemSuccess())
                dispatch(fetchAllLessonItemsStart())
            }else{
                toast.error("Update the lesson Item error!")
                dispatch(editLessonItemFailed());
            }
        } catch(e) {
            toast.error("Update the lesson Item error!")
            dispatch(editLessonItemFailed());
            console.log('editLessonItemFailed error', e)
        }
    }
}

export const editLessonItemSuccess = () => ({
    type: actionTypes.EDIT_LESSON_ITEM_SUCCESS,
})

export const editLessonItemFailed = () => ({
    type: actionTypes.EDIT_LESSON_ITEM_FAILD,
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
