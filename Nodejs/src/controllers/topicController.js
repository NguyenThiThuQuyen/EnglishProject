import topicService from "../services/topicService";

const multer = require('multer')
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

 //upload image
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadImage = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')



module.exports = {
    handleCreateNewTopic: handleCreateNewTopic,
    handleEditTopic: handleEditTopic,
    handleDeleteTopic: handleDeleteTopic,
    handleGetAllTopics: handleGetAllTopics,
    uploadImage: uploadImage,
}
