import React, {Component} from 'react';
import BScroll from 'better-scroll';
import Cartcontrol from '../cartcontrol/cartcontrol';
import './shopcart.styl';

export default class Shopcart extends Component {
  constructor(props) {
    super();
    this.state = {
      balls: [{show: false}, {show: false}, {show: false}, {show: false}],
      dropBalls: [],
      fold: true,
      totalPrice: 0,
      totalCount: 0,
      payDesc: '还差20元起送',
      payClass: 'not-enough',
      listShow: false,
    }
    this.toggleList = this.toggleList.bind(this)
    this.pay = this.pay.bind(this)
    this.empty = this.empty.bind(this)
    this.addFood = this.addFood.bind(this)
  }

  toggleList() {
    var onOff = !this.state.totalCount || this.state.listShow ? false : true
    this.setState({
      listShow: onOff
    })

    setTimeout(() => {
      var ele = document.querySelector('.list-content');
      if (ele) {
        new BScroll(ele, {
          click: true
        })
      }
    })
  }

  addFood() {
    this.props.addFood()
  }

  empty() {
    this.props.selectFoods.map((item, index) => {
      item.count = 0;
      return item;
    });
    this.props.addFood()
  }

  pay() {
    if (this.state.totalPrice < this.props.minPrice) {
      return;
    }
    window.alert(`支付${this.state.totalPrice}元`);
  }

  componentDidUpdate() {
    var total = 0;
    var totalCount = 0;
    this.props.selectFoods.forEach((item, index) => {
      total += item.price * item.count;
      totalCount += item.count;
    });
    var payDesc = '';
    var payClass = 'not-enough'
    if (total === 0) {
      payDesc = `￥${this.props.minPrice}元起送`;
      payClass = 'not-enough';
    } else if (total < this.props.minPrice) {
      payDesc = `还差￥${this.props.minPrice - total}元起送`;
      payClass = 'not-enough'
    } else {
      payDesc = `去结算`;
      payClass = 'enough'
    }
    if (total === this.state.totalPrice) {
      return false
    }
    this.setState({
      payDesc,
      payClass,
      totalPrice: total,
      totalCount,
      listShow: this.state.listShow&&total
    })
  }

  render() {
    return (
      <div>
        <div className="shopcart">
          <div className="content" onClick={this.toggleList}>
            <div className="content-left">
              <div className="logo-wrapper">
                <div className={this.state.totalCount > 0 ? 'highlight logo' : 'logo'}>
                  <i className={this.state.totalCount > 0 ? 'highlight icon-shopping_cart' : 'icon-shopping_cart'}></i>
                </div>
                {this.state.totalCount > 0 ? (
                  <div className="num">{this.state.totalCount}</div>
                ) : null}
              </div>
              <div className={this.state.totalCount > 0 ? 'highlight price' : 'price'}>
                ￥{this.state.totalPrice}</div>
              <div className="desc">另需配送费￥{this.props.deliveryPrice}元</div>
            </div>
            <div className="content-right"
                 onClick={this.pay}>
              <div className={this.state.payClass + ' pay'}>{this.state.payDesc}</div>
            </div>
          </div>
          <div className="ball-container">
            {this.state.balls.map((ball, index) => {
              return (
                <div key={index}>
                  {/*// <transition name="drop"@before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">*/}
                  {ball.show ? (
                    <div className="ball">
                      <div className="inner inner-hook"></div>
                    </div>
                  ) : null}
                  {/*</transition>*/}
                </div>
              )
            })}
          </div>
          {this.state.listShow ? (
            <div className="shopcart-list">
              <div className="list-header">
                <h1 className="title">购物车</h1>
                <span className="empty" onClick={this.empty}>清空</span>
              </div>
              <div className="list-content">
                <ul>
                  {this.props.selectFoods.map((food, index) => {
                    return (
                      <li className="food" key={index}>
                        <span className="name">{food.name}</span>
                        <div className="price">
                          <span>￥{food.price * food.count}</span>
                        </div>
                        <div className="cartcontrol-wrapper">
                          <Cartcontrol add={this.addFood}
                                       food={food}></Cartcontrol>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
        {this.state.listShow ? (
          < div className="list-mask" onClick={this.hideList}></div>
        ) : null}
      </div>
    )
  }
}