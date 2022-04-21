import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    users: [],
    topics: [],
    topTopics: [],
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
            // let copyState = {...state};
            state.genders = action.data;
            state.isLoadingGender = false;
            // console.log('fire fetch gender success: ', action)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILD:
            // console.log('fire fetch gender failed: ', action)
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

        default:
            return state;
    }
}

export default adminReducer;