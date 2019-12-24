/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import Card from './Card';
import Pokeball from './pokeball.svg';
import './App.css';

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      prevTotal: 0,
      scrolling: false,
      loading: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadUsers();
    this.scrollListener = window.addEventListener('scroll', (e) => this.handleScrolling(e));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleScrolling = () => {
    const { scrolling } = this.state;
    if (scrolling) return;
    const lastUser = document.querySelector(
      'div.cards > div.card-user:last-child',
    );
    const lastUserOffset = lastUser.offsetTop + lastUser.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    const bottomOffset = 20;
    if (pageOffset > lastUserOffset - bottomOffset) this.loadMore();
  };

  loadUsers = () => {
    const { prevTotal, pokemons } = this.state;
    this.setState({ loading: true });
    fetch(`${process.env.REACT_APP_BASE_API_URL}/pokemon/?offset=${prevTotal}`)
      .then((response) => response.json())
      .then((myJson) => this.setState({
        pokemons: [...pokemons, ...myJson.results],
      }))
      .finally(() => this.setState({ loading: false }));
  };

  loadMore = () => {
    this.setState(
      (prevState) => ({
        prevTotal: prevState.prevTotal + 10,
      }),
      this.loadUsers,
    );
  };

  render() {
    const { pokemons, loading } = this.state;
    return (
      <div className="App App-header">
        <h1>Infinite Scroll</h1>
        <div className="container">
          <div className="cards">
            {pokemons.map((pokemon, index) => (
              <Card
                {...pokemon}
                key={index}
              />
            ))}

          </div>
          {loading && (
            <div className="loading">
              <span>
                <img src={Pokeball} className="pokeball" alt="" />
              </span>
            </div>
          )}
        </div>

      </div>
    );
  }
}

export default App;
