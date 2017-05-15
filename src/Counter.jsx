import React from 'react';
import './firstStyles.scss';
import  'whatwg-fetch';
/**
 * A counter button: tap the button to increase the count.
 */
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      dataResponse: 'No data'
    };
  }
 

  render() {
    return (
      <div>
      First Test
      <button
        onClick={() => {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        Count: {this.state.count}
      </button>
      <button
        onClick={() => {
          fetch('https://pasat-backend.herokuapp.com/test', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }).then((response) => {
            return response.json();
          }).then((jsonData) => {
            this.setState({ dataResponse: jsonData.anObject.item2 });
          });
        }}
      >
        Fetch data
      </button>
      {this.state.dataResponse}
      </div>
    );
  }
}
export default Counter;