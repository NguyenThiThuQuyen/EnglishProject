import lessonListService from "../services/lessonListService";

const path = require('path')

let handleGetAllLessonLists = async(req, res) => {
    let id = req.query.id; //all, id

    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            lessonLists: []
        })
    }

    let lessonLists = await lessonListService.getAllLessonLists(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        lessonLists
    })
}

let handleCreateNewLessonList = async(req, res) => {
    let message = await lessonListService.createNewLessonList(req.body);
    console.log(message);
    return res.status(200).json(message);
}


let handleEditLessonList = async(req, res) => {
    let data = req.body;
    let message = await lessonListService.updateLessonListData(data);
    return res.status(200).json(message)
}

let handleDeleteLessonList =  async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await lessonListService.deleteLessonList(req.body.id);
    return res.status(200).json(message);
 }

//export ra interface
 let getLessonListHome = async(req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try {
        // console.log('check res: ', response)
        let response = await lessonListService.getLessonListHome(limit);
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
    handleCreateNewLessonList: handleCreateNewLessonList,
    handleEditLessonList: handleEditLessonList,
    handleGetAllLessonLists: handleGetAllLessonLists,
    handleDeleteLessonList: handleDeleteLessonList,
    getLessonListHome: getLessonListHome,
}
