import React, {Component} from 'react';
import seller from '../../../data.json'

class App extends Component {
  constructor(props){
    super(props);
    this.showDetail = this.showDetail.bind(this);
    this.hideDetail = this.hideDetail.bind(this);
    this.state = {
      detailShow: false,
      seller,
    }
  }
  showDetail() {
    this.detailShow = true;
  }
  hideDetail() {
    this.detailShow = false;
  }

  render() {
    return (
      <div className="header">
        <div className="content-wrapper">
          <div className="avatar">
            <img width="64" height="64" src={seller.avatar}/>
          </div>
          <div className="content">
            <div className="title">
              <span className="brand"></span>
              <span className="name">{seller.name}</span>
            </div>
            <div className="description">
              {seller.description}/{seller.deliveryTime}分钟送达
            </div>
            {
              seller.supports ? (
                <div className="support">
                  <span className="icon" classNameName={classNameMap[seller.supports[0].type]}></span>
                  <span className="text">{seller.supports[0].description}</span>
                </div>
              ) : null
            }
          </div>
          {seller.supports ? (
            <div className="support-count" onClick={showDetail}>
              <span className="count">{seller.supports.length}个</span>
              <i className="icon-keyboard_arrow_right"></i>
            </div>
          ) : null}

        </div>
        <div className="bulletin-wrapper" onClick={showDetail}>
          <span className="bulletin-title"></span>
          <span className="bulletin-text">{seller.bulletin}</span>
          <i className="icon-keyboard_arrow_right"></i>
        </div>
        <div className="background">
          <img src={seller.avatar} width="100%" height="100%"/>
        </div>
        <transition name="fade">
          <div v-show="detailShow" className="detail">
            <div className="detail-wrapper clearfix">
              <div className="detail-main">
                <h1 className="name">{seller.name}</h1>
                <div className="star-wrapper">
                  {/*<star size={48} score={seller.score}></star>*/}
                </div>
                <div className="title">
                  <div className="line"></div>
                  <div className="text">优惠信息</div>
                  <div className="line"></div>
                </div>
                {seller.supports ? (
                  <ul className="supports">
                    {seller.supports.map((item, index)=>{
                      return (
                        <li className="support-item">
                          <span className="icon" className={classNameMap[seller.supports[index].type]}></span>
                          <span className="text">{seller.supports[index].description}</span>
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
                  <p className="content">{seller.bulletin}</p>
                </div>
              </div>
            </div>
            <div className="detail-close" onClick={hideDetail}>
              <i className="icon-close"></i>
            </div>
          </div>
        </transition>
      </div>
    )
  }
}
