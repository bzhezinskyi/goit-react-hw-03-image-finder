import { Component } from 'react';
import axios from 'axios';

import { getPixabay } from 'PixabayAPI/PixabayAPI';
import Searchbar from './Searchbar';

export default class App extends Component {
  state = { pixabay: null, page: 1 };

  onSubmitSearchbar = value => {
    console.log(value);
  };

  feachData = async ({ page = 1 }) => {
    try {
      // const data = await getPixabay({ page });
      // console.dir(data);
      await axios
        .get(
          'https://pixabay.com/api/?key=31260524-b97567eeef5bd60bea7834f85',
          {
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 12,
            page,
          }
        )
        .then(data => {
          this.setState({ pixabay: data.data.hits });
        });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="App">
        {/* <Searchbar onSubmit={this.feachData} /> */}
        <button type="button" onClick={this.feachData}></button>
      </div>
    );
  }
}
