import React, {Component} from 'react';
import './cartcontrol.styl'

export default class Cartcontrol extends Component {
  constructor(props) {
    super();
    this.state = {
      food: props.food
    }
    this.decreaseCart = this.decreaseCart.bind(this);
    this.addCart = this.addCart.bind(this);
  }

  addCart(event) {
    !this.props.food.count ? this.props.food.count = 1 : this.props.food.count++;
    this.props.add(event)
  }

  decreaseCart(event) {
    this.props.food.count--;
    this.props.add(event)
  }

  render() {
    return (
      <div className="cartcontrol">
        {this.props.food.count > 0 ? (
          <div className="cart-decrease" onClick={this.decreaseCart}>
            <span className="inner icon-remove_circle_outline"></span>
          </div>
        ) : null}
        {this.props.food.count > 0 ? (
          <div className="cart-count">{this.props.food.count}</div>
        ) : null}
        <div className="cart-add icon-add_circle" onClick={this.addCart}></div>
      </div>
    )
  }
}
