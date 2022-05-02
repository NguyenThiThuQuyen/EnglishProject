import axios from '../axios';


const getAllVocabs = (inputId) => {
    return axios.get(`/api/get-all-vocabs?id=${inputId}`)
}

const createNewVocabService = (data) => {
    console.log('check data from service: ', data)
    return axios.post(`/api/create-new-vocab`, data) 
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


export {
    getAllVocabs,
    createNewVocabService,
    deleteVocabService,
    editVocabService 
}