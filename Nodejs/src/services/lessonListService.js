import db from "../models/index";
import bcrypt from "bcryptjs";


let getSearchTopicFromLessionList = (id) => {
    return new Promise(async(resolve, reject) => {
        try{
            let searchLessonList = await db.LessonList.findAll({
                where: { topicId: id },
                include:[
                    {model: db.Topic, as: 'topicData', attributes: ['topicName']},
                ],
                raw: true,
                nest: true,
            })
            // console.log("check search", searchLessonList)
            resolve(searchLessonList)
        }
        catch(e) {
            reject(e)
        }
    })
}

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

let checkLessonListName = (nameLessonList) => {
    return new Promise(async(resolve, reject) => {
        try
        {   
            let name = await db.LessonList.findOne({
                where: {name: nameLessonList}
            })
            // console.log("check danh sách danh mục",name)
            if(name)
            {
                resolve(true);
            }
            else
            {
                resolve(false);
            }
        }catch(e)
        {
            reject(e);
        }
    })
}

let createNewLessonList = async (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(data.topicId){
                let temp = await db.LessonList.findAll({ //lấy được mảng theo khóa ngoại
                    where: {topicId: data.topicId}
                })
                // console.log("check temp: ", temp.name)
                if(temp && temp.length >0){      //kiểm tra temp có tồn tại ko 
                    let check = ''
                    temp.map((item =>{          //duyệt mảng temp
                    if(data.name === item.name)     //so sánh tên nhập vào với từng dòng trong mảng theo tên
                    {
                        check = 'true'
                    }
                    }))
                        console.log("check mới", check )
                    if(check === "true"){
                        resolve({
                            errCode: 1,
                            errMessage: `Lesson list name was existed !`
                        })
                    }
                    else{
                        await db.LessonList.create({
                            name: data.name,
                            topicId: data.topicId
                        })
                        resolve({
                            errCode: 0,
                            errMessage: `create a new lesson list succeed !`
                        })
                    }
                }
                else
                {
                    await db.LessonList.create({
                        name: data.name,
                        topicId: data.topicId
                        })
                        resolve({
                            errCode: 0,
                            errMessage: `create a new lesson list succeed !`
                        })
                }
            }
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

let getLessonListHome = (topicId) => {
    console.log("check toppicId", topicId)
    return new Promise(async(resolve, reject) => {
        try{
            let lessonLists = await db.LessonList.findAll({
                where: {topicId: topicId},
                order: [['createdAt', 'DESC']],
            })
            console.log('check 123123: ', lessonLists)
            resolve({
                errCode: 0,
                data: lessonLists
            })
        }catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewLessonList: createNewLessonList,
    updateLessonListData: updateLessonListData,
    getAllLessonLists: getAllLessonLists,
    deleteLessonList: deleteLessonList,
    getLessonListHome: getLessonListHome,
    checkLessonListName: checkLessonListName,
    getSearchTopicFromLessionList: getSearchTopicFromLessionList

}