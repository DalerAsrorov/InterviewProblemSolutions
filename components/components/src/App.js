import React, { Component } from 'react';
import logo from './logo.svg';
import { getResults } from './api';
import './App.css';

const debounced = (fn, n = 2000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      console.log('made search');
      fn(...args);
      timeoutId = null;
    }, n);
  };
};

const SearchInput = React.forwardRef((props, ref) => {
  return (
    <div className="search-input-wrapper">
      <input autoFocus type="text" ref={ref} {...props} />
    </div>
  );
});

const ResultItem = ({ id, title, author, isActive }) => {
  return (
    <li
      className="result-item"
      style={{ background: isActive ? 'lightgrey' : null }}
    >
      <h2>{title}</h2>
      <h4>by {author}</h4>
    </li>
  );
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSearch = debounced(this.handleSearch.bind(this), 1200);
  }

  state = {
    searchInput: '',
    currentActiveIndex: 0,
    items: []
  };

  handleInput(event) {
    const nextValue = event.currentTarget.value;
    this.setState((prevState, props) => ({
      searchInput: nextValue,
      currentActiveIndex: 0
    }));
  }

  handleSearch(event) {
    const { searchInput } = this.state;

    getResults(searchInput).then(data => {
      this.setState({
        items: data
      });
    });
  }

  handleKeyDown(event) {
    let { currentActiveIndex: activeIndex, items } = this.state;

    if (event.key === 'ArrowUp') {
      // user pressed up arrow - decerement
      if (activeIndex === 0) {
        return;
      }

      this.setState({
        currentActiveIndex: activeIndex - 1
      });
    } else if (event.key === 'ArrowDown') {
      // user pressed down arrow - increment
      if (items.length - 1 === activeIndex) {
        return;
      }

      this.setState({
        currentActiveIndex: activeIndex + 1
      });
    } else if (event.key === 'Enter') {
      console.log('submit', items[activeIndex]);
    }
  }

  render() {
    const { items, currentActiveIndex, searchInput } = this.state;

    return (
      <div className="App">
        <SearchInput
          value={searchInput}
          ref={ref => (this.inputRef = ref)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.handleSearch.bind(this)}
          onInput={this.handleInput.bind(this)}
        />
        <ul className="list-holder">
          {Array.isArray(items) &&
            items.map((post, i) => (
              <ResultItem
                key={post.id}
                id={post.id}
                title={post.title}
                author={post.author}
                isActive={currentActiveIndex === i}
              />
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
