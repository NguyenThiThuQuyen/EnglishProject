import db from "../models/index";
// import getSearchVocabFromLession from './vocabService'
import bcrypt from "bcryptjs";

let getSearchVocabFromLession = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            let search = await db.Vocab.findAll({
                where: { lessonId: id },
            })
            console.log("check search", search)
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
                        {model: db.LessonList, as: 'lessonListData', attributes: ['name']},
                        {model: db.Lesson, as: 'lessonData', attributes: ['lessonName', 'id']},
                    ],
                    raw: true,
                    nest: true,
                })
                // let lessonData = []
                // lessonData = lessonLessonLists.lessonData
                // let temp = lessonData.lessonData
                // console.log("check id", lessonData)
                // check = await db.Vocab.findAll({
                //     include: [
                //         {model: db.Vocab, as: 'lessonData1', attributes: ['vocab']},
                //     ],
                //     raw: true,
                //     nest: true,
                // })
            }
            if(lessonLessonListId && lessonLessonListId !== 'ALL') {
                lessonLessonLists = await db.LessonLessonList.findOne({
                    where: { id: lessonLessonListId},
                    include:[
                        {model: db.LessonList, as: 'lessonListData', attributes: ['name']},
                        {model: db.Lesson, as: 'lessonData', attributes: ['lessonName']},
                        
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
    return new Promise(async(resolve, reject) => {
        try{
            // let check = await getSearchVocabFromLession(data.lessonId);
            // if(check === true){
            // }
            await db.LessonLessonList.create({
                lessonId: data.lessonId,
                lessonListId: data.lessonListId,
            })
            
            resolve('create a new lesson - lessonlist succeed')
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

// let getLessonListHome = (limitInput) => {
//     return new Promise(async(resolve, reject) => {
//         try{
//             let lessonLists = await db.LessonList.findAll({
//                 limit: limitInput,
//                 order: [['createdAt', 'DESC']],
//                 // include: [
//                 //     { model: db.LessonList, as: 'genderData', atributes: ['valueEn', 'valueVi'] }
//                 // ],
//                 // raw: true,
//                 // nest: true,
//             })
//             resolve({
//                 errCode: 0,
//                 data: lessonLists
//             })
//         }catch(e) {
//             reject(e);
//         }
//     })
// }

module.exports = {
    createNewLessonLessonList: createNewLessonLessonList,
    getAllLessonLessonLists: getAllLessonLessonLists,
    updateLessonLessonListData: updateLessonLessonListData,
    deleteLessonLessonList: deleteLessonLessonList,
    getSearchVocabFromLession: getSearchVocabFromLession

}