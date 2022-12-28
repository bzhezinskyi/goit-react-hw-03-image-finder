// import PixabayAPI from 'PixabayAPI/PixabayAPI';
import { Component } from 'react';
import Searchbar from './Searchbar';

export default class App extends Component {
  onSubmitSearchbar = value => {
    console.log(value);
  };
  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmitSearchbar} />
      </div>
    );
  }
}
