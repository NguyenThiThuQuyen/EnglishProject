import lessonService from "../services/lessonService";

const path = require('path')

let handleGetAllLessons = async(req, res) => {
    let id = req.query.id; //all, id
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            lessons: []
        })
    }
    let lessons = await lessonService.getAllLessons(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        lessons
    })
}

let handleCreateNewLesson = async(req, res) => {
    let message = await lessonService.createNewLesson(req.body);
    console.log(message);
    return res.status(200).json(message);
}


let handleEditLesson = async(req, res) => {
    let data = req.body;
    let message = await lessonService.updateLessonData(data);
    return res.status(200).json(message)
}

let handleDeleteLesson =  async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await lessonService.deleteLesson(req.body.id);
    return res.status(200).json(message);
 }

//export ra interface
let getLessonHome = async(req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try {
        // console.log('check res: ', response)
        let response = await lessonService.getLessonHome(limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}


module.exports = {
    handleGetAllLessons: handleGetAllLessons,
    handleCreateNewLesson: handleCreateNewLesson,
    handleEditLesson: handleEditLesson,
    handleDeleteLesson: handleDeleteLesson,
    getLessonHome: getLessonHome,
}
