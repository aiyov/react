import React, {Component} from 'react';
import BScroll from 'better-scroll';
import './seller.styl';
import Split from '../split/split';
import Star from '../star/star';
import data from '../../data.json';

export default class Seller extends Component {
    constructor(props) {
        super()
        this.state = {
            favorite:false,
            seller: data.seller,
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        }
        this.toggleFavorite = this.toggleFavorite.bind(this)
        this._initScroll = this._initScroll.bind(this)
        this._initPics = this._initPics.bind(this)
    }

    componentDidMount() {
        this._initScroll()
        this._initPics()
    }

    _initScroll() {
        if (!this.scroll) {
            this.scroll = new BScroll(document.querySelector('.seller'), {
                click: true
            });
        } else {
            this.scroll.refresh();
        }
    }

    _initPics() {
        if (this.state.seller.pics) {
            let picWidth = 120;
            let margin = 6;
            let width = (picWidth + margin) * this.state.seller.pics.length - margin;
            document.querySelector('.pic-list').style.width = width + 'px';
            if (!this.picScroll) {
                this.picScroll = new BScroll(document.querySelector('.pic-wrapper'), {
                    scrollX: true,
                    eventPassthrough: 'vertical'
                });
            } else {
                this.picScroll.refresh();
            }
        }
    }
    toggleFavorite() {
        this.setState({
            favorite: !this.state.favorite
        })
    }
    render() {
        return (
            <div className="seller">
                <div className="seller-content">
                    <div className="overview">
                        <h1 className="title">{this.state.seller.name}</h1>
                        <div className="desc border-1px">
                            <Star size="36" score={this.state.seller.score}></Star>
                            <span className="text">({this.state.seller.ratingCount})</span>
                            <span className="text">月售{this.state.seller.sellCount}单</span>
                        </div>
                        <ul className="remark">
                            <li className="block">
                                <h2>起送价</h2>
                                <div className="content">
                                    <span className="stress">{this.state.seller.minPrice}</span>元
                                </div>
                            </li>
                            <li className="block">
                                <h2>商家配送</h2>
                                <div className="content">
                                    <span className="stress">{this.state.seller.deliveryPrice}</span>元
                                </div>
                            </li>
                            <li className="block">
                                <h2>平均配送时间</h2>
                                <div className="content">
                                    <span className="stress">{this.state.seller.deliveryTime}</span>分钟
                                </div>
                            </li>
                        </ul>
                        <div className="favorite" onClick={this.toggleFavorite}>
                            <span className={this.state.favorite ? 'active icon-favorite' : 'icon-favorite'}></span>
                            <span className="text">{this.state.favorite?'已收藏':'收藏'}</span>
                        </div>
                    </div>
                    <Split></Split>
                    <div className="bulletin">
                        <h1 className="title">公告与活动</h1>
                        <div className="content-wrapper border-1px">
                            <p className="content">{this.state.seller.bulletin}}</p>
                        </div>
                        {this.state.seller.supports ? (
                            <ul className="supports">
                                {this.state.seller.supports.map((item, index) => {
                                    return (
                                        <li className="support-item border-1px" key={index}>
                                            <span
                                                className={this.state.classMap[this.state.seller.supports[index].type] + ' icon'}></span>
                                            <span
                                                className="text">{this.state.seller.supports[index].description}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : null}

                    </div>
                    <Split></Split>
                    <div className="pics">
                        <h1 className="title">商家实景</h1>
                        <div className="pic-wrapper" ref="picWrapper">
                            <ul className="pic-list" ref="picList">
                                {this.state.seller.pics.map((pic, index) => {
                                    return (
                                        <li key={index} className="pic-item">
                                            <img alt="图片" src={pic} width="120" height="90"/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <Split></Split>
                    <div className="info">
                        <h1 className="title border-1px">商家信息</h1>
                        <ul>
                            {this.state.seller.infos.map((info, index) => {
                                return (
                                    <li className="info-item" key={index}>{info}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}