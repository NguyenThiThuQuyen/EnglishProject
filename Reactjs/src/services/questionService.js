import axios from '../axios';


const getAllQuestions = (inputId) => {
    return axios.get(`/api/get-all-questions?id=${inputId}`)
}

const createNewQuestionService = (data) => {
    console.log('check data from service: ', data)
    return axios.post(`/api/create-new-question`, data) 
}

const deleteQuestionService = (questionId) => {
    return axios.delete('/api/delete-question', {
        data: {
            id: questionId
        }
    });
}

const editQuestionService = (inputData) => {
    return axios.put('/api/edit-question', inputData);
}

const getQuestionHomeService = (lessonId) => {
    return axios.get(`/api/question-home?lessonId=${lessonId}`)
}


const createChoiseAnswerService = (data) => {
    console.log("inputData",data)
    return axios.post('/api/create-choise-answer', data);
}

const tronbangService = async (id) => {
    // console.log("inputData",data)
    // console.log("check temp questionService", temp)
    return axios.get(`/api/tronbang?id=${id}`); 
}
const checkQuestionService = (dataInput) => {
    console.log("inputData",dataInput)
    return axios.post('/api/checkQueston', dataInput);
}

const getAllanswerFromQuestionId = (questionId) => {
    // console.log("inputData",dataInput)
    return axios.get(`/api/getAllanswerFromQuestionId?questionId=${questionId}`);
}

const getQuestionFromLessonId = (lessonId) => {
    
    // console.log("inputData",dataInput)
    return axios.get(`/api/getQuestionFromLessonId?lessonId=${lessonId}`);
}

export {
    getAllQuestions,
    createNewQuestionService,
    deleteQuestionService,
    editQuestionService,
    createChoiseAnswerService,
    getQuestionHomeService,
    tronbangService,
    checkQuestionService,
    getAllanswerFromQuestionId,
    getQuestionFromLessonId
}