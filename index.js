import React, { Component } from 'react';
import { render } from 'react-dom';
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
    fetch("http://app.toronto.ca/opendata/cart/road_restrictions.json?v=2.0")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true
            , Closure: result.Closure
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
    const { error, isLoaded, Closure } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {Closure.map(Closure => (
            <li key={Closure.id}>
              {Closure.district} {Closure.name}
            </li>
          ))}
        </ul>
      );
    }
  }
}

render(<dataListing />, document.getElementById('data'));
