import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    users: [],

    topics: [],
    topTopics: [],

    lessonLists: [],
    topLessonLists: [],

    lessons: [],
    topLessons: [],

    vocabs: [],
    topVocabs: [],

    lessonLessonLists: [],
    topLessonItems: [],

    search: [],

    questions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // GENDER
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.isLoadingGender = true;
            console.log('fire fetch gender start: ', action)
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILD:
            state.isLoadingGender = false;
            state.genders = []
            return {
                ...state,
            }

        // ROLE
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
            
        case actionTypes.FETCH_ROLE_FAILD:
            state.roles = []
            return {
                ...state,
            }
            
        //user
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_FAILD:
            state.users = [];
            return {
                ...state,
            }

        //topic
        case actionTypes.FETCH_ALL_TOPICS_SUCCESS:
            state.topics = action.topics;
            return {
                ...state,
            }
    
        case actionTypes.FETCH_ALL_TOPICS_FAILD:
           state.topics = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_TOPICS_SUCCESS:
            state.topTopics = action.dataTopics;
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_TOPICS_FAILD:
            state.topTopics = [];
            return {
                ...state,
            }

        //lesson list
        case actionTypes.FETCH_ALL_LESSON_LISTS_SUCCESS:
            state.lessonLists = action.lessonLists;
            return {
                ...state,
            }
    
        case actionTypes.FETCH_ALL_LESSON_LISTS_FAILD:
           state.lessonLists = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_LESSON_LISTS_SUCCESS:
            state.topLessonLists = action.dataLessonLists;
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_LESSON_LISTS_FAILD:
            state.topLessonLists = [];
            return {
                ...state,
            }

        //lesson
        case actionTypes.FETCH_ALL_LESSONS_SUCCESS:
            state.lessons = action.lessons;
            return {
                ...state,
            }
    
        case actionTypes.FETCH_ALL_LESSONS_FAILD:
           state.lessons = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_LESSONS_SUCCESS:
            state.topLessons = action.dataLessons;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_LESSONS_FAILD:
            state.topLessons = [];
            return {
                ...state,
            }

        
        //vocab
        case actionTypes.FETCH_ALL_VOCABS_SUCCESS:
            state.vocabs = action.vocabs;
            return {
                ...state,
            }
    
        case actionTypes.FETCH_ALL_VOCABS_FAILD:
           state.vocabs = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_VOCABS_SUCCESS:
            state.topVocabs = action.dataVocabs;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_VOCABS_FAILD:
            state.topVocabs = [];
            return {
                ...state,
            }

        //lesson item
        case actionTypes.FETCH_ALL_LESSON_ITEMS_SUCCESS:
            state.lessonLessonLists = action.lessonLessonLists;
            return {
                ...state,
            }
    
        case actionTypes.FETCH_ALL_LESSON_ITEMS_FAILD:
           state.lessonLessonLists = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_LESSON_ITEMS_SUCCESS:
            state.topLessonItems = action.dataLessonItems;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_LESSON_ITEMS_FAILD:
            state.topLessonItems = [];
            return {
                ...state,
            }

        //search
        case actionTypes.FETCH_ALL_SEARCH_VOCABS_SUCCESS:
            state.search = action.search;
            return {
                ...state,
            }
    
        case actionTypes.FETCH_ALL_SEARCH_VOCABS_FAILD:
           state.search = [];
            return {
                ...state,
            }

        //question
        case actionTypes.FETCH_ALL_QUESTIONS_SUCCESS:
            state.questions = action.questions;
            return {
                ...state,
            }
    
        case actionTypes.FETCH_ALL_QUESTIONS_FAILD:
           state.questions = [];
            return {
                ...state,
            }
        // case actionTypes.FETCH_TOP_LESSON_LISTS_SUCCESS:
        //     state.topLessonLists = action.dataLessonLists;
        //     return {
        //         ...state,
        //     }

        // case actionTypes.FETCH_TOP_LESSON_LISTS_FAILD:
        //     state.topLessonLists = [];
        //     return {
        //         ...state,
        //     }
        
        default:
            return state;
    }
}

export default adminReducer;