import React, { Component } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

class Content extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef()
    this.state = {
      showMask: true
    }
  }

  componentDidMount() {
    this.loadIframe(this.props.url)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url) {
      this.setState({
        showMask: true
      })
      this.loadIframe(nextProps.url)
    }
  }

  loadIframe(src) {
    const iframe = document.createElement('iframe')
    iframe.src = src
    iframe.width = '100%'
    iframe.height = '100%'
    iframe.onload = _ => {
      this.setState({
        showMask: false
      })
    }
    this.myRef.current.innerHTML = ''
    this.myRef.current.appendChild(iframe)
  }

  render() {
    return (
      <div className="content">
        {this.state.showMask ? <div className="mask"><LoadingOutlined style={{fontSize: 50}} /></div> : null}
        <div className="box" ref={this.myRef}></div>
      </div>
    )
  }
}

export default Content