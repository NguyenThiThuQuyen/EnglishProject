import express from "express"
import { route } from "express/lib/router";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import topicController from "../controllers/topicController";
import lessonListController from "../controllers/lessonListController";

let router = express.Router();
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/hoidanit', (req, res) => {
        return res.send("Hello world with hoidanit")
    });
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/allcode', userController.getAllCode);


    //topic
    router.get('/api/get-all-topics', topicController.handleGetAllTopics);
    router.post('/api/create-new-topic', topicController.handleCreateNewTopic);
    router.put('/api/edit-topic', topicController.handleEditTopic);
    router.delete('/api/delete-topic', topicController.handleDeleteTopic);

    router.get('/api/topic-home', topicController.getTopicHome);


    //lesson list
    router.get('/api/get-all-lesson-lists', lessonListController.handleGetAllLessonLists);
    router.post('/api/create-new-lesson-list', lessonListController.handleCreateNewLessonList);
    router.put('/api/edit-lesson-list', lessonListController.handleEditLessonList);
    router.delete('/api/delete-lesson-list', lessonListController.handleDeleteLessonList);

    

    return app.use("/", router);
}

module.exports = initWebRoutes;