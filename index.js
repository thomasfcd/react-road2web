import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './style.css';

class dataListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
      , isLoaded: false
      , Closure: []
    };
  }

  componentDidMount() {
    axios.get(`http://app.toronto.ca/opendata/cart/road_restrictions.json?v=2.0`)
      .then(res => {
        const Closure = res.map(obj => obj.data);
        this.setState({ Closure });
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.Closure.map(post =>
            <li key={post.id}>{post.name}</li>
          )}
        </ul>
      </div>
      );
    }
}

render(<dataListing />, document.getElementById('data'));
