import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes'

function requestPosts(subreddit) {
    return {
        type: types.default.REQUEST_POSTS,
        subreddit
    }
}

function receivePosts(subreddit, json) {
    return {
        type: types.default.RECEIVE_POSTS,
        subreddit,
        posts: json,
        receivedAt: Date.now()
    }
}

 export function invalidateSubreddit(subreddit) {
     return {
         type: types.default.INVALIDATE_SUBREDDIT,
         subreddit
     }
 }

// 来看一下我们写的第一个 thunk action 创建函数！
// 虽然内部操作不同，你可以像其它 action 创建函数 一样使用它：
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {

    // Thunk middleware 知道如何处理函数。
    // 这里把 dispatch 方法通过参数的形式传给函数，
    // 以此来让它自己也能 dispatch action。

    return function (dispatch) {

        // 首次 dispatch：更新应用的 state 来通知
        // API 请求发起了。

        dispatch(requestPosts(subreddit))

        // thunk middleware 调用的函数可以有返回值，
        // 它会被当作 dispatch 方法的返回值传递。

        // 这个案例中，我们返回一个等待处理的 promise。
        // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。

        return fetch(`/v2/${subreddit}/1220562`)
            .then(
                response => response.json(),
                // 不要使用 catch，因为会捕获
                // 在 dispatch 和渲染中出现的任何错误，
                // 导致 'Unexpected batch number' 错误。
                // https://github.com/facebook/react/issues/6895
                error => console.log('An error occurred.', error)
            )
            .then(json =>
                // 可以多次 dispatch！
                // 这里，使用 API 请求结果来更新应用的 state。

                dispatch(receivePosts(subreddit, json))
            )
    }
}