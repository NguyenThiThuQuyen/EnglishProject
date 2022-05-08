import express from "express"
import { route } from "express/lib/router";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import topicController from "../controllers/topicController";
import lessonListController from "../controllers/lessonListController";
import lessonController from "../controllers/lessonController";
import lessonLessonListController from "../controllers/lessonLessonListController";
import vocabController from "../controllers/vocabController";
import questionController from "../controllers/questionController";


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

    router.get('/api/lesson-list-home', lessonListController.getLessonListHome);

    //lesson
    router.get('/api/get-all-lessons', lessonController.handleGetAllLessons);
    router.post('/api/create-new-lesson', lessonController.handleCreateNewLesson);
    router.put('/api/edit-lesson', lessonController.handleEditLesson);
    router.delete('/api/delete-lesson', lessonController.handleDeleteLesson);

    router.get('/api/lesson-home', lessonController.getLessonHome);

    //lesson-lessonlist
    router.get('/api/get-all-lessons-lessonlists', lessonLessonListController.handleGetAllLessonsLessonLists);
    router.post('/api/create-new-lesson-lessonlist', lessonLessonListController.handleCreateNewLessonLessonList);
    router.put('/api/edit-lesson-lessonlist', lessonLessonListController.handleEditLessonLessonList);
    router.delete('/api/delete-lesson-lessonlist', lessonLessonListController.handleDeleteLessonLessonList);

    router.get('/api/lesson-item-home', lessonLessonListController.getLessonItemHome);


    //vocab
    router.get('/api/get-all-vocabs', vocabController.handleGetAllVocabs);
    router.post('/api/create-new-vocab', vocabController.handleCreateNewVocab);
    router.put('/api/edit-vocab', vocabController.handleEditVocab);
    router.delete('/api/delete-vocab', vocabController.handleDeleteVocab);

    //search
    router.get('/api/search-vocab', vocabController.handleSearchVocab);
    router.get('/api/search-vocab-in-question', vocabController.handleSearchVocabInQuestion);
    router.get('/api/search-topic-in-lesson-list', lessonListController.handleSearchTopicInLessonList);

    //question
    router.get('/api/get-all-questions', questionController.handleGetAllQuestions);
    router.post('/api/create-new-question', questionController.handleCreateNewQuestion);
    router.put('/api/edit-question', questionController.handleEditQuestion);
    router.delete('/api/delete-question', questionController.handleDeleteQuestion);
    // router.get('/api/search-vocab', vocabController.handleSearchVocab);

    return app.use("/", router);
}

module.exports = initWebRoutes;