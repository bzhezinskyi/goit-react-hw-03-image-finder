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
    pixabay: [],
    status: STATUS.idle, // 'idle', 'success', 'error'
    loading: false,
    search: '',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      try {
        const data = await getPixabay({
          page: this.state.page,
          q: this.state.search,
        });
        const newData = data.hits.map(el => ({
          id: el.id,
          largeImageURL: el.largeImageURL,
          webformatURL: el.webformatURL,
          tags: el.tags,
        }));
        if (newData.length !== 0) {
          this.setState(prevState => ({
            pixabay: [...prevState.pixabay, ...newData],
            status: STATUS.success,
            loading: false,
          }));
        } else {
          this.setState({
            loading: false,
            status: STATUS.error,
            search: 'Oops!!! Non-existent value.',
          });
        }
      } catch (error) {
        console.log(error);
        this.setState({
          status: STATUS.error,
          search: error.message,
          loading: false,
        });
      }
    }
  }

  handleSearch = async search => {
    if (search === this.state.search) {
      return;
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    await this.setState({ search, status: STATUS.idle, page: 1, pixabay: [] });
  };

  handleLoadeMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = (largeImageURL, tags) => {
    this.setState({ modal: { largeImageURL, tags } });
  };

  handleCloseModal = () => {
    this.setState({ modal: null });
  };

  render() {
    const { status, pixabay, search, modal, loading } = this.state;
    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />

        {status === STATUS.error && <h2>{search}</h2>}
        {status === STATUS.success && (
          <>
            <ImageGallery
              GalleryList={pixabay}
              handleClick={this.handleOpenModal}
            />
            {!loading && <Button onClick={this.handleLoadeMore} />}
          </>
        )}
        {loading && <Loader />}
        {modal && (
          <Modal onModal={modal} onCloseModal={this.handleCloseModal} />
        )}
      </div>
    );
  }
}
