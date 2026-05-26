import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class MyToast extends Component {
  render() {
    const toastCss = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: '1',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    };
    return (
      <div style={this.props.children.show ? toastCss : null}>
        <Toast className={`border ${this.props.children.type === "success" ? "border-success bg-success" : "border-danger bg-danger"} text-white`} show={this.props.children.show} closeButton={false}>
          <Toast.Header className={this.props.children.type === "success" ? "bg-success text-white" : "bg-danger text-white"}>
            <strong className="mr-auto">{this.props.children.type === "success" ? "Success" : "Danger"}</strong>
          </Toast.Header>
          <Toast.Body>
            {this.props.children.message}
          </Toast.Body>
        </Toast>
      </div>
    );
  }
}