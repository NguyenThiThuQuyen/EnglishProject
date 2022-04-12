import topicService from "../services/topicService";

const path = require('path')

let handleGetAllTopics = async(req, res) => {
    let id = req.query.id; //all, id

    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            topics: []
        })
    }

    let topics = await topicService.getAllTopics(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        topics
    })
}

let handleCreateNewTopic = async(req, res) => {
    let message = await topicService.createNewTopic(req.body);
    console.log(message);
    return res.status(200).json(message);
}


let handleEditTopic = async(req, res) => {
    let data = req.body;
    let message = await topicService.updateTopicData(data);
    return res.status(200).json(message)
}

let handleDeleteTopic =  async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await topicService.deleteTopic(req.body.id);
    return res.status(200).json(message);
 }


module.exports = {
    handleCreateNewTopic: handleCreateNewTopic,
    handleEditTopic: handleEditTopic,
    handleDeleteTopic: handleDeleteTopic,
    handleGetAllTopics: handleGetAllTopics,
}
