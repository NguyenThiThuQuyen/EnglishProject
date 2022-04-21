import lessionListService from "../services/lessionListService";

const path = require('path')

// let handleGetAllTopics = async(req, res) => {
//     let id = req.query.id; //all, id

//     if(!id) {
//         return res.status(200).json({
//             errCode: 0,
//             errMessage: 'Missing required parmeters',
//             topics: []
//         })
//     }

//     let topics = await topicService.getAllTopics(id);
//     return res.status(200).json({
//         errCode: 0,
//         errMessage: 'Ok',
//         topics
//     })
// }

let handleCreateNewLessionList = async(req, res) => {
    let message = await lessionListService.createNewLessionList(req.body);
    console.log(message);
    return res.status(200).json(message);
}


// let handleEditTopic = async(req, res) => {
//     let data = req.body;
//     let message = await topicService.updateTopicData(data);
//     return res.status(200).json(message)
// }

// let handleDeleteTopic =  async(req, res) => {
//     if(!req.body.id){
//         return res.status(200).json({
//             errCode: 1,
//             errMessage: "Missing required parameters"
//         })
//     }
//     let message = await topicService.deleteTopic(req.body.id);
//     return res.status(200).json(message);
//  }

 //export ra interface
//  let getTopicHome = async(req, res) => {
//     let limit = req.query.limit;
//     if(!limit) limit = 10;
//     try {
//         // console.log('check res: ', response)
//         let response = await topicService.getTopicHome(limit);
//         return res.status(200).json(response);
//     } catch (e) {
//         console.log(e);
//         return res.status(200).json({
//             errCode: -1,
//             message: 'Error from server...'
//         })
//     }
// }


module.exports = {
    handleCreateNewLessionList: handleCreateNewLessionList,
    // handleEditTopic: handleEditTopic,
    // handleDeleteTopic: handleDeleteTopic,
    // handleGetAllTopics: handleGetAllTopics,
    // getTopicHome: getTopicHome,
}
