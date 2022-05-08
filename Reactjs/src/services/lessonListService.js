import axios from '../axios';


const getAllLessonLists = (inputId) => {
    return axios.get(`/api/get-all-lesson-lists?id=${inputId}`)
}

const getSearchTopicFromLessionList = (inputId) => {
    return axios.get(`/api/search-topic-in-lesson-list?id=${inputId}`)
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

const getLessonListHomeService = (topicId) => {
    return axios.get(`/api/lesson-list-home?topicId=${topicId}`)
}


export {
    getAllLessonLists,
    createNewLessonListService,
    deleteLessonListService,
    editLessonListService,
    getLessonListHomeService,
    getSearchTopicFromLessionList
}