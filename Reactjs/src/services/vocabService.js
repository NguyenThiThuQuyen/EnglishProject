import axios from '../axios';


const getAllVocabs = (inputId) => {
    return axios.get(`/api/get-all-vocabs?id=${inputId}`)
}

const createNewVocabService = (data) => {
    console.log('check data from service: ', data)
    return axios.post(`/api/create-new-vocab`, data) 
}

const getSearchWordMeaningToVocabService = (inputId) => {
    return axios.get(`/api/search-word-meaning-to-vocab?id=${inputId}`)
}

const deleteVocabService = (vocabId) => {
    return axios.delete('/api/delete-vocab', {
        data: {
            id: vocabId
        }
    });
}

const editVocabService = (inputData) => {
    return axios.put('/api/edit-vocab', inputData);
}

// const getTopicHomeService = (limit) => {
//     return axios.get(`/api/topic-home?limit=${limit}`)
// }

const getAllVocabsFromLessonId = (lessonId) => {
    return axios.get(`/api/get-all-vocab-from-lesson?lessonId=${lessonId}`);
}


export {
    getAllVocabs,
    createNewVocabService,
    deleteVocabService,
    editVocabService,
    getAllVocabsFromLessonId,
    getSearchWordMeaningToVocabService
}