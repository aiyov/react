import React, {Component} from 'react';
import { connect } from 'react-redux'
import {getAllProducts} from './../actions/index'

class Test extends Component {
  constructor(props) {
    super()
  }
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div>123456</div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(getAllProducts(id))
    }
  }
}

const mapStateToProps = (state, ownprops) => {
  console.log('===========')
  console.log(ownprops)
  return {
    todos: getAllProducts()
  }
}

const VisibleTodoList = connect(
  mapDispatchToProps,
  mapStateToProps
)(Test)

export default VisibleTodoList