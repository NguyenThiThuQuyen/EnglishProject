import db from "../models/index";
import bcrypt from "bcryptjs";




let getAllLessons = (lessonId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let lessons = '';
            if(lessonId === 'ALL') {
                lessons = await db.Lesson.findAll({
                })
            }
            if(lessonId && lessonId !== 'ALL') {
                lessons = await db.Lesson.findOne({
                    where: { id: lessonId},
                })
            }
            resolve(lessons)
        }catch(e) {
            reject(e)
        }
    })
}

let createNewLesson = async (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            await db.Lesson.create({
                lessonName: data.lessonName,
                lessonImage: data.lessonImage,
            })
            resolve('create a new lesson succeed')
        }catch(e){
            reject(e);
        }
    })
}

let updateLessonData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.id){
                // console.log('check nodejs ', data)
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }else{
                let lesson = await db.Lesson.findOne({
                    where: {id: data.id},
                    raw: false
                })
                if (lesson) {
                    lesson.lessonName = data.lessonName;
                    if(data.lessonImage) {
                        lesson.lessonImage = data.lessonImage;
                    }
                    await lesson.save();
                    resolve({
                        errCode: 0,
                        message: 'Update the Lesson succeeds!'
                    });
                }else {
                    resolve({
                        errCode: 1,
                        errMessage: `Lesson not found!`
                    });
                }
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteLesson = (lessonId) => {
    return new Promise (async(resolve, reject) => {
        let foundLesson = await db.Lesson.findOne({
            where: {id: lessonId}
        })
        if(!foundLesson) {
            resolve({
                errCode: 2,
                errMessage: `The Lesson isn't exist`
            })
        }
        await db.Lesson.destroy({
            where: {id: lessonId}
        })
        resolve({
            errCode: 0,
            message: `The Lesson is deleted`
        })
    })
}

let getLessonHome = (limitInput) => {
    return new Promise(async(resolve, reject) => {
        try{
            let lessons = await db.Lesson.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: lessons
            })
        }catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewLesson: createNewLesson,
    getAllLessons: getAllLessons,
    updateLessonData: updateLessonData,
    deleteLesson: deleteLesson,
    getLessonHome: getLessonHome,
}