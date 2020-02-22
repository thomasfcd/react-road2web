import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class dataListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
      , isLoaded: false
      , closures: []
    };
  }

  componentDidMount() {
    fetch("http://app.toronto.ca/opendata/cart/road_restrictions.json?v=2.0")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true
            , closures: result.Closure
          });
        },
        (error) => {
          this.setState({
            isLoaded: true
            , error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, closures } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {closures.map(closure => (
            <li key={closure.id}>
              {closure.district} {closure.name}
            </li>
          ))}
        </ul>
      );
    }
  }
}

render(<dataListing />, document.getElementById('data'));
