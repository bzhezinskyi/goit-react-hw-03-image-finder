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
    status: STATUS.idle, // 'idle', 'success', 'error'
    loading: false,
    search: '',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    console.log(this.state.page === prevState.page);
    if (prevState.search !== this.state.search) {
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
          this.setState({
            pixabay: newData,
            status: STATUS.success,
            loading: false,
          });
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

    // if (prevState.page !== this.state.page) {
    //   try {
    //     const data = await getPixabay({
    //       page: this.state.page,
    //       q: this.state.search,
    //     });
    //     const newData = data.hits.map(el => ({
    //       id: el.id,
    //       largeImageURL: el.largeImageURL,
    //       webformatURL: el.webformatURL,
    //       tags: el.tags,
    //     }));
    //     if (newData.length !== 0) {
    //       this.setState(prevState => ({
    //         pixabay: [...prevState.pixabay, ...newData],
    //         page: prevState.page + 1,
    //       }));

    //       this.setState({
    //         status: STATUS.success,
    //         loading: false,
    //       });
    //     } else {
    //       this.setState({
    //         loading: false,

    //         status: STATUS.error,
    //         search: 'Oops!!! Non-existent value.',
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     this.setState({
    //       status: STATUS.error,
    //       search: error.message,
    //       loading: false,
    //     });
    //   }
    // }
  }

  // fetchGalleryList = async ({ page, newGallery = false, search = '' }) => {
  //   this.setState({ loading: true });
  //   try {
  //     const data = await getPixabay({ page, q: search });
  //     const newData = data.hits.map(el => ({
  //       id: el.id,
  //       largeImageURL: el.largeImageURL,
  //       webformatURL: el.webformatURL,
  //       tags: el.tags,
  //     }));
  //     console.log(newData);
  //     if (newData.length !== 0) {
  //       newGallery &&
  //         this.setState({
  //           pixabay: newData,
  //           page: 2,
  //         });

  //       !newGallery &&
  //         this.setState(prevState => ({
  //           pixabay: [...prevState.pixabay, ...newData],
  //           page: prevState.page + 1,
  //         }));

  //       this.setState({
  //         status: STATUS.success,
  //         loading: false,
  //       });
  //     } else {
  //       this.setState({
  //         loading: false,

  //         status: STATUS.error,
  //         search: 'Oops!!! Non-existent value.',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({
  //       status: STATUS.error,
  //       search: error.message,
  //       loading: false,
  //     });
  //   }
  // };

  handleSearch = async search => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    await this.setState({ search, status: STATUS.idle, page: 1 });
    // await this.fetchGalleryList({
    //   page: 1,
    //   newGallery: true,
    //   search: this.state.search,
    // });
  };
  handleLoadeMore = () => {
    this.setState({ page: 2 });
    console.log(this.state.page);
  };

  handleClick = (largeImageURL, tags) => {
    this.setState({ modal: { largeImageURL, tags } });
  };

  handleCloseModal = () => {
    this.setState({ modal: null });
  };

  render() {
    const { status, pixabay, page, search, modal, loading } = this.state;
    return (
      <div className="App">
        <Searchbar onSearch={this.handleSearch} />

        {status === STATUS.error && <h2>{search}</h2>}
        {status === STATUS.success && (
          <>
            <ImageGallery
              GalleryList={pixabay}
              handleClick={this.handleClick}
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
