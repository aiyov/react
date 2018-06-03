import React, {Component} from 'react';
import './star.styl'

const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default class Star extends Component {
  constructor(props) {
      super();
      this.state ={
          itemClasses: ()=>{
              let result = [];
              let score = Math.floor(props.score * 2) / 2;
              let hasDecimal = score % 1 !== 0;
              let integer = Math.floor(score);
              for (let i = 0; i < integer; i++) {
                  result.push(CLS_ON);
              }
              if (hasDecimal) {
                  result.push(CLS_HALF);
              }
              while (result.length < LENGTH) {
                  result.push(CLS_OFF);
              }
              return result;
          }
      }

  }
  componentBeforeMount() {
      /**/
  }
  render() {
      return (
          <div className={`star star-${this.props.size}`}>
              {this.state.itemClasses().map(function (itemClass, index) {
                  return (
                      <span className={`star-item ${itemClass}`} key={index}></span>
                  )
              })}
          </div>
      )
  }
}