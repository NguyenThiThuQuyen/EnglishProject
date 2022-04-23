import axios from '../axios';


const getAllLessonLists = (inputId) => {
    return axios.get(`/api/get-all-lesson-lists?id=${inputId}`)
}

const createNewLessonListService = (data) => {
    console.log('check data from service: ', data)
    return axios.post(`/api/create-new-lesson-list`, data) 
}

const deleteLessonListService = (lessonListId) => {
    return axios.delete('/api/delete-lesson-list', {
        data: {
            id: lessonListId
        }
    });
}

const editLessonListService = (inputData) => {
    return axios.put('/api/edit-lesson-list', inputData);
}

// const getTopicHomeService = (limit) => {
//     return axios.get(`/api/topic-home?limit=${limit}`)
// }


export {
    getAllLessonLists,
    createNewLessonListService,
    deleteLessonListService,
    editLessonListService
}