import questionService from "../services/questionService";

const path = require('path')

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



module.exports = {
    handleCreateNewQuestion: handleCreateNewQuestion,
    handleGetAllQuestions: handleGetAllQuestions,
    handleEditQuestion: handleEditQuestion,
    handleDeleteQuestion: handleDeleteQuestion,


}
