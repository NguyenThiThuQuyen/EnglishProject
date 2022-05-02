import vocabService from "../services/vocabService";
import lessonLessonListService from "../services/lessonLessonListService"

const path = require('path')



let handleSearchVocab = async(req, res) => {
    let id = req.query.id; //all, id

    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parmeters',
            search: []
        })
    }
    let search = await lessonLessonListService.getSearchVocabFromLession(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        search
    })
}


let handleGetAllVocabs = async(req, res) => {
    let id = req.query.id; //all, id

    if(!id) {
        return res.status(200).json({
            errCode: 0,
            errMessage: 'Missing required parmeters',
            vocabs: []
        })
    }

    let vocabs = await vocabService.getAllVocabs(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        vocabs
    })
}

let handleCreateNewVocab = async(req, res) => {
    let message = await vocabService.createNewVocab(req.body);
    console.log(message);
    return res.status(200).json(message);
}


let handleEditVocab = async(req, res) => {
    let data = req.body;
    let message = await vocabService.updateVocabData(data);
    return res.status(200).json(message)
}

let handleDeleteVocab =  async(req, res) => {
    if(!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters"
        })
    }
    let message = await vocabService.deleteVocab(req.body.id);
    return res.status(200).json(message);
}

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
    handleCreateNewVocab: handleCreateNewVocab,
    handleGetAllVocabs: handleGetAllVocabs,
    handleEditVocab: handleEditVocab,
    handleDeleteVocab: handleDeleteVocab,
    handleSearchVocab: handleSearchVocab
}
