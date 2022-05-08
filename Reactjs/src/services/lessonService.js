import axios from '../axios';


const getAllLessons = (inputId) => {
    return axios.get(`/api/get-all-lessons?id=${inputId}`)
}

// const createNewLessonService = (data) => {
//     console.log('check data from service: ', data)
//     return axios.post(`/api/create-new-lesson`, data) 
// }


const createNewLessonService = (data) => {
    console.log('check data from service: ', data)
    return axios.post(`/api/create-new-lesson-lessonlist`, data) 
}



const createNewLessonLessonList = (data) => {
    console.log('check data from service: ', data)
    return axios.post(`/api/create-new-lesson-lessonlist`, data) 
}

const deleteLessonService = (lessonId) => {
    return axios.delete('/api/delete-lesson', {
        data: {
            id: lessonId
        }
    });
}

const editLessonService = (inputData) => {
    return axios.put('/api/edit-lesson', inputData);
}

const getLessonHomeService = (limit) => {
    return axios.get(`/api/lesson-home?limit=${limit}`)
}


export {
    getAllLessons, 
    createNewLessonService, 
    deleteLessonService,
    editLessonService,
    getLessonHomeService,
    createNewLessonLessonList
}