import db from "../models/index";
import bcrypt from "bcryptjs";

let getAllLessionLists = (lessionListId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let lessionLists = '';
            if(lessionListId === 'ALL') {
                lessionLists = await db.LessionList.findAll({
                    // attributes:{
                    //     exclude: ['password']
                    // }
                })
            }
            if(lessionListId && lessionListId !== 'ALL') {
                lessionLists = await db.LessionList.findOne({
                    where: { id: lessionListId},
                    // attributes:{
                    //     exclude: ['password']
                    // }
                })
            }
            resolve(lessionLists)
        }catch(e) {
            reject(e)
        }
    })
}

let createNewLessionList = async (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            await db.LessionList.create({
                name: data.name,
                topicId: data.topicId
            })
            resolve('create a new lession list succeed')
        }catch(e){
            reject(e);
        }
    })
}

let updateLessionListData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.id || !data.topicId){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }else{
                let lessionList = await db.LessionList.findOne({
                    where: {id: data.id},
                    raw: false
                })
                
                if (lessionList) {
                    lessionList.name = data.name;
                    lessionList.topicId = data.topicId;
                    await lessionList.save();
                    resolve({
                        errCode: 0,
                        message: 'Update the lession list succeeds!'
                    });
                }else {
                    resolve({
                        errCode: 1,
                        errMessage: `Lession list not found!`
                    });
                }
            }
        }catch(e){
            reject(e);
        }
    })
}

// let deleteTopic = (topicId) => {
//     return new Promise (async(resolve, reject) => {
//         let foundTopic = await db.Topic.findOne({
//             where: {id: topicId}
//         })
//         if(!foundTopic) {
//             resolve({
//                 errCode: 2,
//                 errMessage: `The topic isn't exist`
//             })
//         }
//         await db.Topic.destroy({
//             where: {id: topicId}
//         })
//         resolve({
//             errCode: 0,
//             message: `The topic is deleted`
//         })
//     })
// }

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
    createNewLessionList: createNewLessionList,
    updateLessionListData: updateLessionListData,
    getAllLessionLists: getAllLessionLists,
}