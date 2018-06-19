import * as types from '../constants/actionTypes'

const initialState = {
  allGoods: [],
  selectFoods: []
};

export default function todoApp(state = initialState, action) {
  switch (action.type)
  {
    case types.default.GET_ALL_FOODS:
      return Object.assign({}, state, {
        allGoods: action.ALL_FOODS
      })
    default:
      return state
  }
}