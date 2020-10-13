import React, { Component } from 'react';
import './App.scss'
import List from './components/List.js'
import Content from './components/Content.js'
import { data } from './data'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: data,
      url: 'https://heptaluan.github.io/demos/project/元素拖拽旋转缩放/index.html'
    }

    this.handleGetClickUrl = this.handleGetClickUrl.bind(this)
  }

  handleGetClickUrl(val) {
    this.setState({
      url: val.item.props.value.val
    })
  }

  render() {
    return (
      <div className="list-box">
        <List onValueChange={this.handleGetClickUrl} data={this.state.data}></List>
        <Content url={this.state.url}></Content>
      </div>
    );
  }
}

export default App;