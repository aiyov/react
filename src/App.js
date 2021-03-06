import React, {Component} from 'react';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import './common/stylus/index.styl';
import './index.styl';
import './App.styl';
import Header from './components/header/header';
import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';
import Seller from './components/seller/seller';
import VisibleTodoList from './container/test';


import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import {getAllProducts} from './actions/index'
import {fetchPosts} from './actions/http'

const loggerMiddleware = createLogger()
let store = createStore(rootReducer, applyMiddleware(
  thunkMiddleware, // 允许我们 dispatch() 函数
  loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
))

store.dispatch(getAllProducts())
store.dispatch(fetchPosts('book'))
console.log(store.getState())

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Provider store={store}>
          <Router>
            <div>
              <div className="tab border-1px">
                <div className="tab-item">
                  <NavLink exact={true} activeClassName="active" to="/">商品</NavLink>
                </div>
                <div className="tab-item">
                  <NavLink activeClassName="active" to="/ratings">评论</NavLink>
                </div>
                <div className="tab-item">
                  <NavLink activeClassName="active" to="/seller">商家</NavLink>
                </div>
              </div>
              <Route exact={true} path="/" component={Goods}/>
              <Route path="/" component={VisibleTodoList}/>
              <Route path="/ratings" component={Ratings}/>
              <Route path="/seller" component={Seller}/>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
