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

export {
    getAllQuestions,
    createNewQuestionService,
    deleteQuestionService,
    editQuestionService,
    createChoiseAnswerService,
    getQuestionHomeService
}