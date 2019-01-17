import React, { Component } from 'react';
import './index.css';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="company">
        <div className="card shadow-sm mb-3">
          <div className="card-body">
            <div className="media">
              <img
                src="images/1.svg"
                className="mr-3"
                width="50"
                alt="corporate logo"
              />
              <div className="media-body">
                <h5 className="card-title">{this.props.detail.name}</h5>
                <p className="card-text">{this.props.detail.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Company;
