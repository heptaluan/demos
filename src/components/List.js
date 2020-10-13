import React, { Component } from 'react';
import { Menu } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

const { SubMenu } = Menu;

class List extends Component {

  handleGetClickUrl = e => {
    this.props.onValueChange(e)
  };

  render() {
    return (
      <Menu
        onClick={this.handleGetClickUrl}
        style={{ width: 280 }}
        defaultSelectedKeys={['Project0']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <SubMenu key="sub1" icon={<HeartTwoTone />} title="Project">
          {this.props.data.Project.map((val, index) => {
            return (
              <Menu.Item value={val} key={'Project' + index}>{val.name}</Menu.Item>
            )
          })}
        </SubMenu>
        <SubMenu key="sub2" icon={<HeartTwoTone />} title="JavaScript">
          {this.props.data.JavaScript.map((val, index) => {
            return (
              <Menu.Item value={val} key={'JavaScript' + index}>{val.name}</Menu.Item>
            )
          })}
        </SubMenu>
        <SubMenu key="sub3" icon={<HeartTwoTone />} title="CSS">
          {this.props.data.CSS.map((val, index) => {
            return (
              <Menu.Item value={val} key={'CSS' + index}>{val.name}</Menu.Item>
            )
          })}
        </SubMenu>
        <SubMenu key="sub4" icon={<HeartTwoTone />} title="Blog">
          {this.props.data.Blog.map((val, index) => {
            return (
              <Menu.Item value={val} key={'Blog' + index}>{val.name}</Menu.Item>
            )
          })}
        </SubMenu>
        <SubMenu key="sub5" icon={<HeartTwoTone />} title="Canvas">
          {this.props.data.Canvas.map((val, index) => {
            return (
              <Menu.Item value={val} key={'Canvas' + index}>{val.name}</Menu.Item>
            )
          })}
        </SubMenu>
        <SubMenu key="sub6" icon={<HeartTwoTone />} title="Basis">
          {this.props.data.Basis.map((val, index) => {
            return (
              <Menu.Item value={val} key={'Basis' + index}>{val.name}</Menu.Item>
            )
          })}
        </SubMenu>
      </Menu>
    );
  }
}

export default List;