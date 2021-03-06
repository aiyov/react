import React, {Component} from 'react';
import Cartcontrol from '../cartcontrol/cartcontrol'
import Shopcart from '../shopcart/shopcart'
import Food from '../food/food'
import BScroll from 'better-scroll';
import './goods.styl';
import data from '../../data.json';

export default class Goods extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
            goods: data.goods,
            selectFoods: [],
            currentIndex: 0,
            listHeight: [],
            scrollY: 0,
            selectedFood: null
        }
        this.goodsType = React.createRef();
        this.goodsList = React.createRef();
        this.meunScroll = null;
        this.foodsScroll = null;
        this.hide = this.hide.bind(this);
        this.addFood = this.addFood.bind(this);
        this.selectMenu = this.selectMenu.bind(this);
        this._initScroll = this._initScroll.bind(this);
        this._followScroll = this._followScroll.bind(this);
        this._calculateHeight = this._calculateHeight.bind(this);
    }

    componentDidMount() {
        console.log(this.goodsList)
        this._initScroll()
        this._calculateHeight()
    }
    hide() {
        this.setState({
            selectedFood: null
        })
    }
    _initScroll() {
        this.meunScroll = new BScroll(this.goodsType.current, {
            click: true
        });

        this.foodsScroll = new BScroll(this.goodsList.current, {
            click: true,
            probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
            // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
            if (pos.y <= 0) {
                var scrollY = Math.abs(Math.round(pos.y))
                for (let i = 0; i < this.state.listHeight.length; i++) {
                    let height1 = this.state.listHeight[i];
                    let height2 = this.state.listHeight[i + 1];
                    if ((scrollY >= height1 && scrollY < height2)) {
                        if (this.state.currentIndex !== i) {
                            this._followScroll(i);
                            this.setState({
                                currentIndex: i
                            })
                        }
                    }
                }
            }
        });
    }

    _calculateHeight() {
        let foodList = document.querySelectorAll('.food-list');
        let arrHeight = this.state.listHeight;
        let height = 0;
        arrHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height += item.clientHeight;
            arrHeight.push(height);
        }
        this.setState({
            listHeight: arrHeight
        })
    }

    _followScroll(index) {
        let menuList = document.querySelectorAll('.menu-item');
        let el = menuList[index];
        this.meunScroll.scrollToElement(el, 300, 0, -100);
    }

    selectMenu(index, ev) {
        let foodList = document.querySelectorAll('.food-list');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 200, 0, 5);
    }

    addFood(e) {
        if(e) e.stopPropagation();
        var food = this.state.goods;
        this.setState({
            goods: food
        })

        var selectFoods = [];
        this.state.goods.forEach(function (item, index) {
            item.foods.forEach(function (item, i) {
                if (item.count && item.count > 0) {
                    selectFoods.push(item)
                }
            })
        })
        this.setState({
            selectFoods
        })
    }
    toInfo(food) {
        this.setState({
            selectedFood: food
        })
    }
    render() {
        return (
            <div>
                <div className="goods">
                    <div className="menu-wrapper" ref={this.goodsType}>
                        <ul>
                            {this.state.goods.map((item, index) => {
                                return (
                                    <li key={index}
                                        onClick={(e) => this.selectMenu(index, e)}
                                        className={this.state.currentIndex === index ? 'current menu-item' : 'menu-item'}>
                                      <span className="text border-1px">
                                          {item.type > 0 ? (
                                              <span className={this.state.classMap[item.type] + ' icon'}></span>
                                          ) : null}
                                          {item.name}
                                      </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="foods-wrapper" ref={this.goodsList}>
                        <ul>
                            {this.state.goods.map((item, index_parent) => {
                                return (
                                    <li ref={this.goodsItem} key={index_parent} className="food-list">
                                        <h1 className="title">{item.name}</h1>
                                        <ul>
                                            {item.foods.map((food, index) => {
                                                return (
                                                    <li onClick={()=>this.toInfo(food)} key={index} className="food-item border-1px">
                                                        <div className="icon">
                                                            <img width="57" height="57" alt="foods" src={food.icon}/>
                                                        </div>
                                                        <div className="content">
                                                            <h2 className="name">{food.name}</h2>
                                                            <p className="desc">{food.description}</p>
                                                            <div className="extra">
                                                                <span className="count">月售{food.sellCount}份</span><span>好评率{food.rating}%</span>
                                                            </div>
                                                            <div className="price">
                                                                <span className="now">￥{food.price}</span>
                                                                {food.oldPrice ? (
                                                                    <span className="old">￥{food.oldPrice}</span>
                                                                ) : null}
                                                            </div>
                                                            <div className="cartcontrol-wrapper">
                                                                <Cartcontrol
                                                                    add={(e)=>this.addFood(e)}
                                                                    food={food}></Cartcontrol>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    < Shopcart addFood={this.addFood} selectFoods={this.state.selectFoods}
                               deliveryPrice={data.seller.deliveryPrice}
                               minPrice={data.seller.minPrice}></Shopcart>
                </div>
                {this.state.selectedFood?(
                    <Food hide={this.hide} add={this.addFood} food={this.state.selectedFood}></Food>
                ):null}
            </div>
        )
    }
}
