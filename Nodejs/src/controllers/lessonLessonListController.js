import lessonLessonListService from "../services/lessonLessonListService";

const path = require('path')

let handleGetAllLessonsLessonLists = async(req, res) => {
    let id = req.query.id; //all, id
    
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            lessonLessonLists: []
        })
    }

    let lessonLessonLists = await lessonLessonListService.getAllLessonLessonLists(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        lessonLessonLists
    })
}

let handleCreateNewLessonLessonList = async(req, res) => {
    let message = await lessonLessonListService.createNewLessonLessonList(req.body);
    console.log(message);
    return res.status(200).json(message);
}


let handleEditLessonLessonList = async(req, res) => {
    let data = req.body;
    let message = await lessonLessonListService.updateLessonLessonListData(data);
    return res.status(200).json(message)
}

let handleDeleteLessonLessonList =  async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await lessonLessonListService.deleteLessonLessonList(req.body.id);
    return res.status(200).json(message);
 }

// //export ra interface
 let getLessonItemHome = async(req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 10;
    try {
        // console.log('check res: ', response)
        let response = await lessonLessonListService.getLessonItemHome(limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}



let getAllLessonFromlessonListId = async(req, res) => {
    try {
        // console.log('check res: ', response)
        let response = await lessonLessonListService.getAllLessonFromlessonItemIdService(req.query.lessonListIdInput);
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
    handleCreateNewLessonLessonList: handleCreateNewLessonLessonList,
    handleGetAllLessonsLessonLists: handleGetAllLessonsLessonLists,
    handleEditLessonLessonList: handleEditLessonLessonList,
    handleDeleteLessonLessonList: handleDeleteLessonLessonList,
    getLessonItemHome: getLessonItemHome,
    getAllLessonFromlessonListId:getAllLessonFromlessonListId

}
