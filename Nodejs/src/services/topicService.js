import db from "../models/index";
import bcrypt from "bcryptjs";

let getAllTopics = (topicId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let topics = '';
            if(topicId === 'ALL') {
                topics = await db.Topic.findAll({
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            if(topicId && topicId !== 'ALL') {
                topics = await db.Topic.findOne({
                    where: { id: topicId},
                    attributes:{
                        exclude: ['password']
                    }
                })
            }
            resolve(topics)
        }catch(e) {
            reject(e)
        }
    })
}

let createNewTopic = async (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            await db.Topic.create({
                topicName: data.topicName,
                topicImage: data.topicImage,
            })
            resolve({
                errCode: 0,
                errMessage: `create a new topic succeed!`
            })
        }catch(e){
            reject(e);
        }
    })
}

let updateTopicData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.id){
                // console.log('check nodejs ', data)
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameters'
                })
            }else{
                let topic = await db.Topic.findOne({
                    where: {id: data.id},
                    raw: false
                })
                
                if (topic) {
                    topic.topicName = data.topicName;
                    if(data.topicImage) {
                        topic.topicImage = data.topicImage;
                    }
                    await topic.save();
                    resolve({
                        errCode: 0,
                        message: 'Update the topic succeeds!'
                    });
                }else {
                    resolve({
                        errCode: 1,
                        errMessage: `Topic not found!`
                    });
                }
            }
        }catch(e){
            reject(e);
        }
    })
}

let deleteTopic = (topicId) => {
    return new Promise (async(resolve, reject) => {
        let foundTopic = await db.Topic.findOne({
            where: {id: topicId}
        })
        if(!foundTopic) {
            resolve({
                errCode: 2,
                errMessage: `The topic isn't exist`
            })
        }
        await db.Topic.destroy({
            where: {id: topicId}
        })
        resolve({
            errCode: 0,
            message: `The topic is deleted`
        })
    })
}

let getTopicHome = (limitInput) => {
    return new Promise(async(resolve, reject) => {
        try{
            let topics = await db.Topic.findAll({
                limit: limitInput,
                // where: { id: req.params.id }, 
                order: [['createdAt', 'DESC']],
                // attributes: {
                //     exclude: ['topicImage']
                // },
                // include: [
                //     { model: db.Topic,
                //         // as: 'genderData',
                //         atributes: ['valueEn', 'valueVi'] }
                // ],
                // raw: true,
                // nest: true,
            })
            resolve({
                errCode: 0,
                data: topics
            })
        }catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewTopic: createNewTopic,
    updateTopicData: updateTopicData,
    deleteTopic: deleteTopic,
    getAllTopics: getAllTopics,
    getTopicHome: getTopicHome,
}