import questionService from "../services/questionService";

const path = require('path')


let handleChoiseAnswer = async(req, res) => {
    
    console.log("req.body",req.body);
    let message = await questionService.createChoiseAnswer(req.body);
    // console.log(message);
    return res.status(200).json(message);
}

let handleGetAllQuestions = async(req, res) => {
    let id = req.query.id; //all, id
    
    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            questions: []
        })
    }

    let questions = await questionService.getAllQuestions(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        questions
    })
}



let handleCreateNewQuestion = async(req, res) => {
    let message = await questionService.createNewQuestion(req.body);
    console.log(message);
    return res.status(200).json(message);
}

let handleEditQuestion = async(req, res) => {
    let data = req.body;
    let message = await questionService.updateQuestionData(data);
    return res.status(200).json(message)
}

let handleDeleteQuestion =  async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await questionService.deleteQuestion(req.body.id);
    return res.status(200).json(message);
 }


let getQuestionHome = async(req, res) => {
    let lessonId = req.query.lessonId;
    if(!lessonId) lessonId = 10;
    try {
        // console.log('check res: ', response)
        let response = await questionService.getQuestionHome(lessonId);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let tronbang = async(req, res) => {
    let id = req.query.id;
    if(!id) id = 10;
    try {
        // console.log('check res: ', response)
        let response = await questionService.tronbangservice(id);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}



let checkQueston = async(req, res) => {
    try {
        // console.log('check res: ', response)
        let response = await questionService.checkQuestonService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}

let getQuestionFromLessonId = async(req, res) => {
    try {
        // console.log('check res: ', response)
        let response = await questionService.getQuestionFromLessonIdService(req.query.lessonId);
        console.log("check response", response)
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getAllanswerFromQuestionId = async(req, res) => {
    let questionId = req.query.questionId;
    let message = await questionService.getAllanswerFromQuestionIdService(questionId);
    return res.status(200).json(message)
}

module.exports = {
    handleCreateNewQuestion: handleCreateNewQuestion,
    handleGetAllQuestions: handleGetAllQuestions,
    handleEditQuestion: handleEditQuestion,
    handleDeleteQuestion: handleDeleteQuestion,
    handleChoiseAnswer: handleChoiseAnswer,
    getQuestionHome: getQuestionHome,
    tronbang:tronbang,
    checkQueston:checkQueston,
    getQuestionFromLessonId:getQuestionFromLessonId,
    getAllanswerFromQuestionId:getAllanswerFromQuestionId
}
