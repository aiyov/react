import React, {Component} from 'react';
import {formatDate} from '../../common/js/date';
import BScroll from 'better-scroll';
import data from '../../data.json';
import './ratings.styl'

console.log(data.ratings)
export default class Ratings extends Component{
    constructor(props) {
        super();
        this.state = {
            seller: data.seller,
            ratings: data.ratings
        }
    }
    componentDidMount() {
        new BScroll(document.querySelector('.ratings'), {
            click: true
        });
    }
    render() {
        return (
            <div className="ratings">
                <div className="ratings-content">
                    <div className="overview">
                        <div className="overview-left">
                            <h1 className="score">{this.state.seller.score}</h1>
                            <div className="title">综合评分</div>
                            <div className="rank">高于周边商家{this.state.seller.rankRate}%</div>
                        </div>
                        <div className="overview-right">
                            <div className="score-wrapper">
                                <span className="title">服务态度</span>
                                {/*<star :size="36" :score="seller.serviceScore"></star>*/}
                                <span className="score">{this.state.seller.serviceScore}</span>
                            </div>
                            <div className="score-wrapper">
                                <span className="title">商品评分</span>
                                {/*<star :size="36" :score="seller.foodScore"></star>*/}
                                <span className="score">{this.state.seller.foodScore}</span>
                            </div>
                            <div className="delivery-wrapper">
                                <span className="title">送达时间</span>
                                <span className="delivery">{this.state.seller.deliveryTime}分钟</span>
                            </div>
                        </div>
                    </div>
                    {/*<split></split>*/}
                    {/*<ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent"
  :ratings="ratings"></ratingselect>*/}
                    <div className="rating-wrapper">
                        <ul>
                            {this.state.ratings.map((rating, index) => {
                                return (
                                    <li key={index} v-show="needShow(rating.rateType, rating.text)" className="rating-item">
                                        <div className="avatar">
                                            <img alt="food" width="28" height="28" src={rating.avatar}/>
                                        </div>
                                        <div className="content">
                                            <h1 className="name">{rating.username}</h1>
                                            <div className="star-wrapper">
                                                {/*<star :size="24" :score="rating.score"></star>*/}
                                                {rating.deliveryTime ? (
                                                    <span className="delivery">{rating.deliveryTime}</span>
                                                ) : null}
                                            </div>
                                            <p className="text">{rating.text}</p>
                                            {rating.recommend && rating.recommend.length ? (
                                                <div className="recommend">
                                                    <span className="icon-thumb_up"></span>
                                                    {rating.recommend.map((item, index) => {
                                                        return (
                                                            <span key={index} className="item">{item}</span>
                                                        )
                                                    })}
                                                </div>
                                            ) : null}
                                            <div className="time">{formatDate(new Date(rating.rateTime), 'yyyy-MM-dd hh:mm')}</div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }}
