import { toast } from "react-toastify";
import actionTypes from './actionTypes';
import {createNewVocabService,
    getAllVocabs,
    deleteVocabService,
    editVocabService,
    // getTopicHomeService,
 }
from "../../services/vocabService";
export const addVocabSuccess = () => ({
    type: actionTypes.ADD_VOCAB_SUCCESS
})


//vocab
export const createNewVocab = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewVocabService(data);
            if(res && res.errCode === 0){
                toast.success("Create a new vocab succeed!")
                dispatch(saveVocabSuccess());
                // dispatch(fetchAllVocabsStart());
            }else{
                dispatch(saveVocabFailed());
            }
        } catch(e) {
            dispatch(saveVocabFailed());
            console.log('saveVocabFailed error', e)
        }
    }
}

export const saveVocabSuccess = () => ({
    type: actionTypes.CREATE_VOCAB_SUCCESS
})

export const saveVocabFailed = () => ({
    type: actionTypes.CREATE_VOCAB_FAILD
})

export const fetchAllVocabsStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllVocabs("ALL");
            // console.log('check res: ', res)

            // let res1 = await getVocabHomeService('');
            // console.log('check res1 get topic: ', res)
            if(res && res.errCode === 0){
                dispatch(fetchAllVocabsSuccess(res.vocabs.reverse()))
            }else{
                toast.error("Fetch all topics error!");
                dispatch(fetchAllVocabsFailed());
            }
        } catch(e) {
            toast.error("Fetch all topics error!");
            dispatch(fetchAllVocabsFailed());
            console.log('fetchAllVocabsStart error', e)
        }
    }
}

export const fetchAllVocabsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_VOCABS_SUCCESS,
    vocabs: data
})

export const fetchAllVocabsFailed = () => ({
    type: actionTypes.FETCH_ALL_VOCABS_FAILD
})

export const deleteAVocab = (vocabId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteVocabService(vocabId);
            if(res && res.errCode === 0){
                toast.success("Delete the Vocab succeed!")
                dispatch(deleteVocabSuccess())
                dispatch(fetchAllVocabsStart())
            }else{
                toast.error("Delete the Vocab error!")
                dispatch(deleteVocabFailed());
            }
        } catch(e) {
            toast.error("Delete the Vocab error!")
            dispatch(deleteVocabFailed());
            console.log('deleteVocabFailed error', e)
        }
    }
}

export const deleteVocabSuccess = () => ({
    type: actionTypes.FETCH_ALL_VOCABS_SUCCESS,
})

export const deleteVocabFailed = () => ({
    type: actionTypes.FETCH_ALL_VOCABS_FAILD,
})

export const editAVocab = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editVocabService(data);
            if(res && res.errCode === 0){
                toast.success("Update the Vocab succeed!")
                dispatch(editVocabSuccess())
                dispatch(fetchAllVocabsStart())
            }else{
                toast.error("Update the Vocab error!")
                dispatch(editVocabFailed());
            }
        } catch(e) {
            toast.error("Update the Vocab error!")
            dispatch(editVocabFailed());
            console.log('editTopicFailed error', e)
        }
    }
}

export const editVocabSuccess = () => ({
    type: actionTypes.EDIT_VOCAB_SUCCESS,
})

export const editVocabFailed = () => ({
    type: actionTypes.EDIT_VOCAB_FAILD,
})

// export const fetchTopTopic = () => {
//     return async (dispatch, getState) => {
//         try {
//             let res = await getTopicHomeService('');
//             console.log('check res topic: ', res)
//             if(res && res.errCode === 0){
//                 dispatch({
//                     type: actionTypes.FETCH_TOP_TOPICS_SUCCESS,
//                     dataTopics: res.data
//                 })
//             }else {
//                 dispatch({
//                     type: actionTypes.FETCH_TOP_TOPICS_FAILD,
//                 })
//             }

//         } catch(e) {
//             console.log('FETCH_TOP_TOPICS_FAILD: ', e)
//             dispatch({
//                 type: actionTypes.FETCH_TOP_TOPICS_FAILD,
//             })
//         }
//     }
// }