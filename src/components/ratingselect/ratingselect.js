import React, {Component} from 'react';
import './ratingselect.styl';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default class Ratingselect extends Component {
    constructor(props) {
        super();
        this.state = {
            desc: {
                all: '全部',
                positive: '满意',
                negative: '不满意'
            },
            positives() {
                return props.ratings.filter((rating, index) => {
                    return rating.rateType === POSITIVE;
                })
            },
            negatives() {
                return props.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                });
            }

        }
        this.select = this.select.bind(this)
        this.toggleContent = this.toggleContent.bind(this)
    }

    select(num) {
        this.props.select(num);
    }
    toggleContent() {
        this.props.toggle(!this.props.onlyContent);
    }
    render() {
        return (
            <div className="ratingselect">
                <div className="rating-type border-1px">
                    <span onClick={() => this.select(2)}
                          className={this.props.selectType === 2 ? 'block positive active' : 'block positive'}>{this.state.desc.all}<span
                        className="count">{this.props.ratings.length}</span></span>
                    <span onClick={() => this.select(0)}
                          className={this.props.selectType === 0 ? 'block positive active' : 'block positive'}>{this.state.desc.positive}<span
                        className="count">{this.state.positives().length}</span></span>
                    <span onClick={() => this.select(1)}
                          className={this.props.selectType === 1 ? 'block positive active' : 'block negative'}>{this.state.desc.negative}<span
                        className="count">{this.state.negatives().length}</span></span>
                </div>
                <div onClick={this.toggleContent} className={this.props.onlyContent ? 'on switch' : 'switch'}>
                    <span className="icon-check_circle"></span>
                    <span className="text">只看有内容的评价</span>
                </div>
            </div>
        )
    }
}