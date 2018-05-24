import React, {Component} from 'react';
import data from '../../data.json';
import './header.styl';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.showDetail = this.showDetail.bind(this);
        this.hideDetail = this.hideDetail.bind(this);
        this.state = {
            classNameMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            detailShow: false,
            seller: data.seller,
        }
    }

    showDetail() {
        this.setState({
            detailShow: true
        })
    }

    hideDetail() {
        this.setState({
            detailShow: false
        })
    }

    componentDidMount() {
        console.log(data)
    }

    render() {
        return (
            <div className="header">
                <div className="content-wrapper">
                    <div className="avatar">
                        <img alt="bei" width="64" height="64" src={this.state.seller.avatar}/>
                    </div>
                    <div className="content">
                        <div className="title">
                            <span className="brand"></span>
                            <span className="name">{this.state.seller.name}</span>
                        </div>
                        <div className="description">
                            {this.state.seller.description}/{this.state.seller.deliveryTime}分钟送达
                        </div>
                        {
                            this.state.seller.supports ? (
                                <div className="support">
                                    <span className={this.state.classNameMap[this.state.seller.supports[0].type]+' icon'}></span>
                                    <span className="text">{this.state.seller.supports[0].description}</span>
                                </div>
                            ) : null
                        }
                    </div>
                    {this.state.seller.supports ? (
                        <div className="support-count" onClick={this.showDetail}>
                            <span className="count">{this.state.seller.supports.length}个</span>
                            <i className="icon-keyboard_arrow_right"></i>
                        </div>
                    ) : null}

                </div>
                <div className="bulletin-wrapper" onClick={this.showDetail}>
                    <span className="bulletin-title"></span>
                    <span className="bulletin-text">{this.state.seller.bulletin}</span>
                    <i className="icon-keyboard_arrow_right"></i>
                </div>
                <div className="background">
                    <img src={this.state.seller.avatar} alt="背景" width="100%" height="100%"/>
                </div>
                {this.state.detailShow?(
                    <div className="detail">
                        <div className="detail-wrapper clearfix">
                            <div className="detail-main">
                                <h1 className="name">{this.state.seller.name}</h1>
                                <div className="star-wrapper">
                                    {/*<star size={48} score={seller.score}></star>*/}
                                </div>
                                <div className="title">
                                    <div className="line"></div>
                                    <div className="text">优惠信息</div>
                                    <div className="line"></div>
                                </div>
                                {this.state.seller.supports ? (
                                    <ul className="supports">
                                        {this.state.seller.supports.map((item, index) => {
                                            return (
                                                <li key={index} className="support-item">
                                                <span
                                                    className={this.state.classNameMap[this.state.seller.supports[index].type] + " icon"}></span>
                                                    <span
                                                        className="text">{this.state.seller.supports[index].description}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                ) : null}
                                <div className="title">
                                    <div className="line"></div>
                                    <div className="text">商家公告</div>
                                    <div className="line"></div>
                                </div>
                                <div className="bulletin">
                                    <p className="content">{this.state.seller.bulletin}</p>
                                </div>
                            </div>
                        </div>
                        <div className="detail-close" onClick={this.hideDetail}>
                            <i className="icon-close"></i>
                        </div>
                    </div>
                ):null}
            </div>
        )
    }
}
