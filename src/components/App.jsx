import { Component } from 'react';

import { getPixabay } from 'services/pixabay.service';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { STATUS } from 'constants/status.constants';
import Loader from './Loader';

export default class App extends Component {
  state = {
    pixabay: null,
    status: STATUS.idle, // 'idle', 'loading', 'success', 'error'
    search: '',
  };

  componentDidMount() {
    this.fetchNewGalleryList({ page: 1 });
  }

  fetchNewGalleryList = async ({ page = 1 }) => {
    this.setState({ status: STATUS.loading });
    try {
      const data = await getPixabay({ page });
      this.setState({
        pixabay: data.hits,
        status: STATUS.success,
      });
    } catch (error) {
      console.log(error);
      this.setState({ status: STATUS.error });
    }
  };
  feachNextGalleryList = async ({ page }) => {
    this.setState({ status: STATUS.loading });
    try {
      const data = await getPixabay({ page });
      this.setState(prevState => ({
        pixabay: [prevState, ...data.hits],
      }));
    } catch (error) {
      console.log(error);
      this.setState({ status: STATUS.error });
    }
  };

  render() {
    const { status, pixabay } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.feachData} />
        {status === STATUS.success && <ImageGallery GalleryList={pixabay} />}
        {(status === STATUS.loading || status === STATUS.idle) && <Loader />}

        <button
          type="button"
          onClick={() => {
            this.feachNextGalleryList({ page: 2 });
          }}
        ></button>
        {}
      </div>
    );
  }
}
