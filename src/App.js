import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import './common/stylus/index.styl';
import './index.styl';
import './App.styl';
import Header from './components/header/header';
import Goods from './components/goods/goods';
import Ratings from './components/ratings/ratings';

const Seller = () => (
    <div>
        <h2>Seller</h2>
    </div>
)

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
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
                        <Route path="/ratings" component={Ratings}/>
                        <Route path="/seller" component={Seller}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
