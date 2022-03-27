import axios from '../axios';


const getAllTopics = (inputId) => {
    return axios.get(`/api/get-all-topics?id=${inputId}`)
}

const createNewTopicService = (data) => {
    console.log('check data from service: ', data)
    return axios.post(`/api/create-new-topic`, data) 
}

const deleteTopicService = (topicId) => {
    return axios.delete('/api/delete-topic', {
        data: {
            id: topicId
        }
    });
}

const editTopicService = (inputData) => {
    return axios.put('/api/edit-topic', inputData);
}


export {
    getAllTopics, 
    createNewTopicService, 
    deleteTopicService,
    editTopicService
}