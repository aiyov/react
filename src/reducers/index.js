import {combineReducers} from 'redux'
import * as types from '../constants/actionTypes'

const initialState = {
    allGoods: [],
    selectFoods: []
};

function todoApp(state = initialState, action) {
    switch (action.type) {
        case types.default.GET_ALL_FOODS:
            return Object.assign({}, state, {
                allGoods: action.ALL_FOODS
            })
        case types.default.RECEIVE_POSTS:
            return Object.assign({}, state, {
                selectFoods: action.posts
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    todoApp,
})

export default rootReducer