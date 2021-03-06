import db from "../models/index";
// import getSearchVocabFromLession from './vocabService'
import bcrypt from "bcryptjs";

let getSearchVocabFromLession = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            let search = await db.Vocab.findAll({
                where: { lessonId: id },
                include:[
                    {model: db.Lesson, as: 'lessonData1', attributes: ['lessonName']},
                    {model: db.WordMeaning, as: 'vocabData', attributes: ['wordmeaning']},
                    {model: db.VocabType, as: 'vocabData1', attributes: ['vocabType']},
                ],
                raw: true,
                nest: true,
            })
            // console.log("check search", search)
            resolve(search)
        }
        catch(e) {
            reject(e)
        }
    })
}




let getAllLessonLessonLists = (lessonLessonListId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let lessonLessonLists = '';
            if(lessonLessonListId === 'ALL' ) {
                lessonLessonLists = await db.LessonLessonList.findAll({
                    include:[
                        {model: db.LessonList, as: 'lessonListData', attributes: ['name', 'topicId', 'id'],
                        include: [{model: db.Topic, as: 'topicData', attributes: ['topicName', 'id']}]
                    },
                        {model: db.Lesson, as: 'lessonData', attributes: ['lessonName', 'id']},
                    ],
                    raw: true,
                    nest: true,
                })
            }
            if(lessonLessonListId && lessonLessonListId !== 'ALL') {
                lessonLessonLists = await db.LessonLessonList.findOne({
                    where: { id: lessonLessonListId},
                    include:[
                        {model: db.LessonList, as: 'lessonListData', attributes: ['name', 'topicId', 'id'],
                        include: [{model: db.Topic, as: 'topicData', attributes: ['topicName', 'id']}]
                    },
                        {model: db.Lesson, as: 'lessonData', attributes: ['lessonName', 'id']},
                    ],
                    raw: true,
                    nest: true,
                })
            }
            resolve(lessonLessonLists)
        }catch(e) {
            reject(e)
        }
    })
}

// let createNewLessonLessonList = async (data) => {
//     return new Promise(async(resolve, reject) => {
//         try{
//             await db.LessonLessonList.create({
//                 lessonId: data.lessonId,
//                 lessonListId: data.lessonListId,
//             })
//             resolve('create a new lesson - lessonlist succeed')
//         }catch(e){
//             reject(e);
//         }
//     })
// }

let createNewLessonLessonList = async (data) => {
    console.log('123:', data)
    return new Promise(async(resolve, reject) => {
        try{

            // let create = await createNewLesson(data.lessonId);
            // console.log('123: ', create)
            // if(create === true){
            //     resolve({
            //         errCode: 1,
            //         errMessage: "The Lesson - lesson list isn't exist"
            //     })
            // }
            // else {
                let createLesson = await db.Lesson.create({
                    lessonName: data.lessonName,
                    lessonImage: data.lessonImage
                })

                let createLessonItem = await db.LessonLessonList.create({
                    lessonId: createLesson.id,
                    lessonListId: data.lessonListId,

                })
            // }
            resolve({
                errCode: 0,
                message: 'create a new lesson - lessonlist succeed!'
            });
        }catch(e){
            reject(e);
        }
    })
}

let updateLessonLessonListData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.id || !data.lessonId || !data.lessonListId){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }else{
                let lessionLessonList = await db.LessonLessonList.findOne({
                    where: {id: data.id},
                    raw: false
                })
                
                if (lessionLessonList) {
                    lessionLessonList.lessonId = data.lessonId;
                    lessionLessonList.lessonListId = data.lessonListId;
                    await lessionLessonList.save();
                    resolve({
                        errCode: 0,
                        message: 'Update the lesson - lesson list succeeds!'
                    });
                }else {
                    resolve({
                        errCode: 1,
                        errMessage: `Lesson - Lesson list not found!`
                    });
                }
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteLessonLessonList = (lessonLessonListId) => {
    return new Promise (async(resolve, reject) => {
        let foundLessonLessonList = await db.LessonLessonList.findOne({
            where: {id: lessonLessonListId}
        })
        if(!foundLessonLessonList) {
            resolve({
                errCode: 2,
                errMessage: `The Lesson - lesson list isn't exist`
            })
        }
        await db.LessonLessonList.destroy({
            where: {id: lessonLessonListId}
        })
        resolve({
            errCode: 0,
            message: `The Lesson - lesson list is deleted`
        })
    })
}

let getLessonItemHome = (limitInput) => {
    return new Promise(async(resolve, reject) => {
        try{
            let lessonItems = await db.LessonLessonList.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                // include: [
                //     { model: db.LessonList, as: 'genderData', atributes: ['valueEn', 'valueVi'] }
                // ],
                // raw: true,
                // nest: true,
            })
            resolve({
                errCode: 0,
                data: lessonItems
            })
        }catch(e) {
            reject(e);
        }
    })
}

let getAllLessonFromlessonItemIdService = (lessonListIdInput) => {
    return new Promise(async(resolve, reject) => {
        try{
            let lessonItems = await db.LessonLessonList.findAll({
                where : {lessonListId: lessonListIdInput},
                include:[
                    {model: db.Lesson, as: 'lessonData', attributes: ['lessonName', 'lessonImage']}
                ],
                raw: true,
                nest: true,

            })
            resolve({
                errCode: 0,
                data: lessonItems
            })
        }catch(e) {
            reject(e);
        }
    })
}
module.exports = {
    createNewLessonLessonList: createNewLessonLessonList,
    getAllLessonLessonLists: getAllLessonLessonLists,
    updateLessonLessonListData: updateLessonLessonListData,
    deleteLessonLessonList: deleteLessonLessonList,
    getSearchVocabFromLession: getSearchVocabFromLession,
    getLessonItemHome: getLessonItemHome,
    getAllLessonFromlessonItemIdService:getAllLessonFromlessonItemIdService

}