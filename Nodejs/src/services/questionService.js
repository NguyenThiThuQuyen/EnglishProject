import db from "../models/index";
import bcrypt from "bcryptjs";
import { getSearchVocabFromLession } from "./lessonLessonListService"

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
            // console.log("check searchFromQuestion", searchFromQuestion)
            resolve(searchFromQuestion)
        }
        catch(e) {
            reject(e)
        }
    })
}

let createChoiseAnswer = (data) => {
    console.log("check data",data);
    return new Promise(async(resolve, reject) => {
        try{
            if(data.lessonId)
            {
                let getNameVoCab = await db.Vocab.findAll({
                    where : {lessonId: data.lessonId}
                }) 

                if(data.answerTrue)
                {
                    getNameVoCab.map((item, index) =>{
                        if(item.vocab === data.answerTrue)
                        {
                            delete getNameVoCab[index]
                            getNameVoCab.splice(index, 1)
                            return getNameVoCab
                            
                        }
                        // console.log("check temp", getNameVoCab)
                        resolve(getNameVoCab)
                        })
                        // console.log("check getNameVoCab",getNameVoCab)
                        if(data.answerFalse1)
                        {
                            getNameVoCab.map((item, index) =>{
                                if(item.vocab === data.answerFalse1)
                                {
                                    delete getNameVoCab[index]
                                    getNameVoCab.splice(index, 1)
                                    return getNameVoCab
                                    
                                }
                                // console.log("check temp", getNameVoCab)
                                resolve(getNameVoCab)
                                })
                                if(data.answerFalse2) 
                                    getNameVoCab.map((item, index) =>{
                                        if(item.vocab === data.answerFalse2)
                                        {
                                            delete getNameVoCab[index]
                                            getNameVoCab.splice(index, 1)
                                            return getNameVoCab                                            
                                        }
                                            // console.log("check temp", getNameVoCab)
                                            resolve(getNameVoCab)
                                            })
                        }
                        console.log("check getNameVoCab",getNameVoCab)


                    
                }
                else{
                    resolve(getNameVoCab)
                }
            }
            else
            {
                resolve({
                    errCode: 1,
                    errMessage: "không có id lessonId trong Vocab"
                })
            }
            
        }
        catch(e){
            reject(e);
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


let getQuestionHome = (lessonId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let questions = await db.Question.findAll({
                where: {lessonId: lessonId},
                // order: [['createdAt', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: questions,
                data1: questions,
                // data1: 
            })
        }catch(e) {
            reject(e);
        }
    })
}

let tronbangservice = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            let mang = ['answerTrue','answerFalse1','answerFalse2','answerFalse3']
            // let mangs = Math.floor(Math.random() * mang.length);
            mang.sort(() => Math.random() - 0.5)
            console.log("check mang", mang)
            let question = await db.Question.findOne({
               where: {id:id},
               attributes: [mang[0],mang[1],mang[2],mang[3]],
            })
            resolve({
                errCode: 0,
                data: question
            })
        }catch(e) {
            reject(e);
        }
    })
}

let checkQuestonService = (dataInput) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(dataInput.id)
            {
                let data = await db.Question.findOne({
                    where: {id : dataInput.id}
                })

             if(dataInput.answer)
             {
                 if(data.answerTrue === dataInput.answer)
                 {
                    resolve(true)
                 }
                 else
                 {
                    resolve(false)
                 }
             }
            }
            
        }catch(e) {
            reject(e);
        }
    })
}


let getQuestionFromLessonIdService = (lessonId) => {
    return new Promise(async(resolve, reject) => {
        try{
            console.log("lessonId", lessonId)
            if(lessonId)
            {
                let data = await db.Question.findAll({
                    where: {lessonId : lessonId}
                })

                // let temp = await tronbangservice(data[0].id)
                // console.log("temp", temp)

                resolve(data)
            }
            
        }catch(e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewQuestion: createNewQuestion,
    getAllQuestions: getAllQuestions,
    updateQuestionData: updateQuestionData,
    deleteQuestion: deleteQuestion,
    getSearchVocabFromLessionInQuesson: getSearchVocabFromLessionInQuesson,
    createChoiseAnswer: createChoiseAnswer,
    getQuestionHome: getQuestionHome,
    tronbangservice:tronbangservice,
    checkQuestonService:checkQuestonService,
    getQuestionFromLessonIdService:getQuestionFromLessonIdService
}