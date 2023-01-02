import { Component } from 'react';

import { getPixabay } from 'services/pixabay.service';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { STATUS } from 'constants/status.constants';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

export default class App extends Component {
  state = {
    modal: null,
    pixabay: null,
    status: STATUS.idle, // 'idle', 'loading', 'success', 'error'
    search: '',
    page: 1,
  };

  async componentDidMount() {
    const { page } = this.state;
    await this.fetchGalleryList({ page, newGallery: true });
  }

  fetchGalleryList = async ({ page, newGallery = false, search = '' }) => {
    this.setState({ status: STATUS.loading });
    try {
      const data = await getPixabay({ page, q: search });
      if (data.hits.length !== 0) {
        newGallery &&
          this.setState({
            pixabay: data.hits,
            page: 2,
          });

        !newGallery &&
          this.setState(prevState => ({
            pixabay: [...prevState.pixabay, ...data.hits],
            page: prevState.page + 1,
          }));

        this.setState({
          status: STATUS.success,
        });
      } else {
        this.setState({
          status: STATUS.error,
          search: 'Oops!!! Non-existent value.',
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: STATUS.error, search: error.message });
    }
  };

  handleSearch = async search => {
    await this.setState({ search });
    await this.fetchGalleryList({
      page: 1,
      newGallery: true,
      search: this.state.search,
    });
  };

  handleClick = (largeImageURL, tags) => {
    this.setState({ modal: { largeImageURL, tags } });
  };

  handleCloseModal = event => {
    if (event.target === event.currentTarget) {
      this.setState({ modal: null });
    }
  };

  render() {
    const { status, pixabay, page, search, modal } = this.state;
    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />
        {status === STATUS.error && <h2>{search}</h2>}
        {status === STATUS.success && (
          <ImageGallery GalleryList={pixabay} handleClick={this.handleClick} />
        )}
        {status === STATUS.loading && <Loader />}
        {status === STATUS.success && (
          <Button
            onClick={() => {
              this.fetchGalleryList({ page, search: search });
            }}
          />
        )}
        {modal && (
          <Modal onModal={modal} onCloseModal={this.handleCloseModal} />
        )}
      </div>
    );
  }
}
