import axios from '../axios';


const getAllLessonItems = (inputId) => {
    return axios.get(`/api/get-all-lessons-lessonlists?id=${inputId}`)
}
const getSearchVocabFromLessonService = (inputId) => {
    return axios.get(`/api/search-vocab?id=${inputId}`)
}



const createNewLessonItemService = (data) => {
    console.log('check data from service: ', data)
    return axios.post(`/api/create-new-lesson-lessonlist`, data) 
}

const deleteLessonItemService = (lessonItemId) => {
    return axios.delete('/api/delete-lesson-lessonlist', {
        data: {
            id: lessonItemId
        }
    });
}

const editLessonItemService = (inputData) => {
    return axios.put('/api/edit-lesson-lessonlist', inputData);
}

// const getLessonItemHomeService = (limit) => {
//     return axios.get(`/api/lesson-list-home?limit=${limit}`)
// }


export {
    getAllLessonItems,
    createNewLessonItemService,
    deleteLessonItemService,
    editLessonItemService,
    getSearchVocabFromLessonService
    // getLessonListHomeService
}