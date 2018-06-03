import React, {Component} from 'react';
import Cartcontrol from '../cartcontrol/cartcontrol';
import Ratingselect from '../ratingselect/ratingselect';
import Split from '../split/split';
import {formatDate} from '../../common/js/date';
import BScroll from 'better-scroll';
import './food.styl';

export default class Food extends Component {
    constructor(props) {
        super()
        this.state = {
            selectType: 2,
            showratings: props.food.ratings,
            onlyContent: false
        }
        this.hide = this.hide.bind(this)
        this.addFirst = this.addFirst.bind(this)
        this.selectRating = this.selectRating.bind(this)
        this.toggleConten = this.toggleConten.bind(this)
        this.filterRatings = this.filterRatings.bind(this)
    }

    componentDidMount() {
        new BScroll(document.querySelector('.food'), {
            click: true
        });
    }

    addFirst(ev) {
        this.props.food.count ? this.props.food.count++ : this.props.food.count = 1
        this.props.add(ev)
    }

    selectRating(num) {
        this.setState({
            selectType: num,
        })
        this.filterRatings(num, null)
    }

    toggleConten(onlyContent) {
        this.setState({
            onlyContent
        })
        this.filterRatings(null, onlyContent)
    }

    filterRatings(selectType, onlyContent) {
        var ratings = [];
        var num = selectType !== null ? selectType : this.state.selectType;
        var onOff = onlyContent !== null ? onlyContent : this.state.onlyContent;
        ratings = this.props.food.ratings.filter((rating) => {
            if (num === 2 && !onOff) {
                return rating
            } else if (num === 2 && onOff) {
                return rating && rating.text
            } else if (!onOff) {
                return rating.rateType === num
            } else {
                return rating.rateType === num && rating.text
            }
        })
        this.setState({
            showratings: ratings
        })
    }

    hide() {
        this.props.hide()
    }

    render() {
        return (
            this.props.food?(
                <div className="food">
                    <div className="food-content">
                        <div className="image-header">
                            <img src={this.props.food.image} alt="food"/>
                            <div className="back" onClick={this.hide}>
                                <i className=" icon-arrow_lift"></i>
                            </div>
                        </div>
                        <div className=" content">
                            <h1 className=" title">{this.props.food.name}</h1>
                            <div className=" detail">
                                <span className=" sell-count">月售{this.props.food.sellCount}份</span>
                                <span className=" rating">好评率{this.props.food.rating}%</span>
                            </div>
                            <div className=" price">
                                <span className=" now">￥{this.props.food.price}</span>
                                {this.props.food.oldPrice ? (
                                    <span className=" old">￥{this.props.food.oldPrice}</span>
                                ) : null}
                            </div>
                            <div className=" cartcontrol-wrapper">
                                <Cartcontrol add={this.props.add} food={this.props.food}></Cartcontrol>
                            </div>
                            {!this.props.food.count || this.props.food.count === 0 ? (
                                <div onClick={this.addFirst} className=" buy">加入购物车</div>
                            ) : null}
                        </div>
                        {this.props.food.info ? (
                            <Split></Split>
                        ) : null}
                        {this.props.food.info ? (
                            <div className=" info">
                                <h1 className=" title">商品信息</h1>
                                <p className=" text">{this.props.food.info}</p>
                            </div>
                        ) : null}
                        <Split></Split>
                        <div className=" rating">
                            <h1 className=" title">商品评价</h1>
                            <Ratingselect select={this.selectRating} toggle={this.toggleConten}
                                          selectType={this.state.selectType}
                                          onlyContent={this.state.onlyContent}
                                          ratings={this.props.food.ratings}></Ratingselect>
                            <div className=" rating-wrapper">
                                {this.props.food.ratings && this.props.food.ratings.length ? (
                                    <ul>
                                        {this.state.showratings.map((rating, index) => {
                                            return (
                                                <li key={index} className="rating-item border-1px">
                                                    <div className="user">
                                                        <span className="name">{rating.username}</span>
                                                        <img alt="food" className="avatar" width="12" height="12"
                                                             src={rating.avatar}/>
                                                    </div>
                                                    <div
                                                        className="time">{formatDate(new Date(rating.rateTime), 'yyyy-MM-dd hh:mm')}</div>
                                                    <p className="text">
                                                    <span
                                                        className={rating.rateType === 0 ? 'icon-thumb_up' : 'icon-thumb_down'}></span>{rating.text}
                                                    </p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                ) : null}
                                {!this.props.food.ratings || !this.props.food.ratings.length ? (
                                    <div className="no-rating">暂无评价</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            ):null
        )
    }
}