import shop from '../api/shop'
import * as types from '../constants/actionTypes'


export const getAllProducts = ()=> {
    type: types.default.GET_ALL_FOODS,
    shop.getProducts
}

const addToCartUnsafe = productId => ({
    type: types.default.ADD_TO_CART,
    productId
})

export const addToCart = productId => (dispatch, getState) => {
    if (getState().products.byId[productId].inventory > 0) {
        dispatch(addToCartUnsafe(productId))
    }
}

export const checkout = products => (dispatch, getState) => {
    const { cart } = getState()

    dispatch({
        type: types.default.CHECKOUT_REQUEST
    })
    shop.buyProducts(products, () => {
        dispatch({
            type: types.default.CHECKOUT_SUCCESS,
            cart
        })
        // Replace the line above with line below to rollback on failure:
        // dispatch({ type: types.CHECKOUT_FAILURE, cart })
    })
}