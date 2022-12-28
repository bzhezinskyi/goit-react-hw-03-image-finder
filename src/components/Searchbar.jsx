import { Component } from 'react';

export default class Searchbar extends Component {
  state = {
    filter: '',
  };

  hendleFilter = event => {
    this.setState({ filter: event.target.value });
  };
  render() {
    return (
      <header
        className="Searchbar"
        onSubmit={() => this.props.onSubmit(this.state.filter)}
      >
        <form className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            placeholder="Search images and photos"
            onChange={this.hendleFilter}
            value={this.state.filter}
          />
        </form>
      </header>
    );
  }
}
