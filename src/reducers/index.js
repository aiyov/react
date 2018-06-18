import {getAllProducts} from '../actions/index'

const initialState = {
    allGoods: [],
    selectFoods: []
};

export default function todoApp(state = initialState, action) {
    switch (action.type) {
        case getAllProducts:
            return Object.assign({}, state, action)
        default:
            return state
    }
}