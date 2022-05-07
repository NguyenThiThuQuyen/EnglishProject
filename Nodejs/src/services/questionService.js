import db from "../models/index";
import bcrypt from "bcryptjs";


let getSearchVocabFromLessionInQuesson = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            let searchFromQuestion = await db.Vocab.findAll({
                where: { lessonId: id },
                include:[
                    {model: db.Lesson, as: 'lessonData1', attributes: ['lessonName']},
                    {model: db.WordMeaning, as: 'vocabData', attributes: ['wordmeaning']},
                    {model: db.VocabType, as: 'vocabData1', attributes: ['vocabType']},
                ],
                raw: true,
                nest: true,
            })
            console.log("check searchFromQuestion", searchFromQuestion)
            resolve(searchFromQuestion)
        }
        catch(e) {
            reject(e)
        }
    })
}


let getAllQuestions = (questionId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let questions = '';
            if(questionId === 'ALL') {
                questions = await db.Question.findAll({
                    include:[
                        {model: db.Lesson, as: 'lessonDataFromQuestion', attributes: ['lessonName', 'id']
                    },
                    ],
                    raw: true,
                    nest: true,
                })
            }
            if(questionId && questionId !== 'ALL') {
                questions = await db.Question.findOne({
                    where: { id: questionId},
                    include:[
                        {model: db.Lesson, as: 'lessonDataFromQuestion', attributes: ['lessonName', 'id']
                    },
                    ],
                    raw: true,
                    nest: true,
                })
            }
            resolve(questions)
        }catch(e) {
            reject(e)
        }
    })
}

let createNewQuestion = async (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            await db.Question.create({
                question: data.question,
                answerTrue: data.answerTrue,
                answerFalse1: data.answerFalse1,
                answerFalse2: data.answerFalse2,
                answerFalse3: data.answerFalse3,
                lessonId: data.lessonId,
            })
            resolve('create a new question succeed')
        }catch(e){
            reject(e);
        }
    })
}

let updateQuestionData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.id || !data.lessonId){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }else{
                let question = await db.Question.findOne({
                    where: {id: data.id},
                    raw: false
                })
                
                if (question) {
                    question.question = data.question,
                    question.answerTrue = data.answerTrue,
                    question.answerFalse1 = data.answerFalse1,
                    question.answerFalse2 = data.answerFalse2,
                    question.answerFalse3 = data.answerFalse3,
                    question.lessonId = data.lessonId,
                    await question.save();
                    resolve({
                        errCode: 0,
                        message: 'Update the question succeeds!'
                    });
                }else {
                    resolve({
                        errCode: 1,
                        errMessage: `question not found!`
                    });
                }
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteQuestion = (questionId) => {
    return new Promise (async(resolve, reject) => {
        let foundQuestion = await db.Question.findOne({
            where: {id: questionId}
        })
        if(!foundQuestion) {
            resolve({
                errCode: 2,
                errMessage: `The lesson list isn't exist`
            })
        }
        await db.Question.destroy({
            where: {id: questionId}
        })
        resolve({
            errCode: 0,
            message: `The lesson list is deleted`
        })
    })
}


module.exports = {
    createNewQuestion: createNewQuestion,
    getAllQuestions: getAllQuestions,
    updateQuestionData: updateQuestionData,
    deleteQuestion: deleteQuestion,
    getSearchVocabFromLessionInQuesson: getSearchVocabFromLessionInQuesson
}