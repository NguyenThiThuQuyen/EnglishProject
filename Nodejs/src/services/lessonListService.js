import db from "../models/index";
import bcrypt from "bcryptjs";

let getAllLessonLists = (lessonListId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let lessonLists = '';
            if(lessonListId === 'ALL') {
                lessonLists = await db.LessonList.findAll({
                    include:[
                        {model: db.Topic, as: 'topicData', attributes: ['topicName', 'topicImage']}
                    ],
                    raw: true,
                    nest: true,

                })
            }
            if(lessonListId && lessonListId !== 'ALL') {
                lessonLists = await db.LessonList.findOne({
                    where: { id: lessonListId},
                    include:[
                        {model: db.Topic, as: 'topicData', attributes: ['topicName', 'topicImage']}
                    ],
                    raw: true,
                    nest: true,
                })
            }
            resolve(lessonLists)
        }catch(e) {
            reject(e)
        }
    })
}

let createNewLessonList = async (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            await db.LessonList.create({
                name: data.name,
                topicId: data.topicId
            })
            resolve('create a new lesson list succeed')
        }catch(e){
            reject(e);
        }
    })
}

let updateLessonListData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.id || !data.topicId){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }else{
                let lessionList = await db.LessonList.findOne({
                    where: {id: data.id},
                    raw: false
                })
                
                if (lessionList) {
                    lessionList.name = data.name;
                    lessionList.topicId = data.topicId;
                    await lessionList.save();
                    resolve({
                        errCode: 0,
                        message: 'Update the lesson list succeeds!'
                    });
                }else {
                    resolve({
                        errCode: 1,
                        errMessage: `Lesson list not found!`
                    });
                }
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteLessonList = (lessonListId) => {
    return new Promise (async(resolve, reject) => {
        let foundLessonList = await db.LessonList.findOne({
            where: {id: lessonListId}
        })
        if(!foundLessonList) {
            resolve({
                errCode: 2,
                errMessage: `The lesson list isn't exist`
            })
        }
        await db.LessonList.destroy({
            where: {id: lessonListId}
        })
        resolve({
            errCode: 0,
            message: `The lesson list is deleted`
        })
    })
}

// let getTopicHome = (limitInput) => {
//     return new Promise(async(resolve, reject) => {
//         try{
//             let topics = await db.Topic.findAll({
//                 limit: limitInput,
//                 order: [['createdAt', 'DESC']],
//                 attributes: {
//                     exclude: ['topicImage']
//                 },
//                 include: [
//                     { model: db.Topic, as: 'genderData', atributes: ['valueEn', 'valueVi'] }
//                 ],
//                 raw: true,
//                 nest: true,
//             })
//             resolve({
//                 errCode: 0,
//                 data: topics
//             })
//         }catch(e) {
//             reject(e);
//         }
//     })
// }

module.exports = {
    createNewLessonList: createNewLessonList,
    updateLessonListData: updateLessonListData,
    getAllLessonLists: getAllLessonLists,
    deleteLessonList: deleteLessonList,
}