import React, { Component } from 'react';
import './App.css';
import RandomDogImage from './components/RandomDogImage';
import Dog from './components/Dog';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dogImage: '',
      favoriteDogs: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/dogs')
      .then(res => {
        this.setState({ favoriteDogs: res.data });
      })
      .catch(err => {
        console.log('err from server', err);
      });
  }

  editDogRating = (rating, id) => {
    axios
      .put(`/api/dogs/${id}?newRating=${rating}`)
      .then(res => {
        this.setState({ favoriteDogs: res.data });
      })
      .catch(err => {
        console.log('err after update', err);
      });
  };

  deleteDog = id => {
    axios
      .delete(`/api/dogs/${id}`)
      .then(res => {
        console.log('res from delete');
        this.setState({ favoriteDogs: res.data });
      })
      .catch(err => console.log('err no delete', err));
  };

  addDog = () => {
    axios
      .post('/api/dogs', { image: this.state.dogImage })
      .then(res => {
        console.log('res from server', res);
        this.setState({ favoriteDogs: res.data, dogImage: '' });
      })
      .catch(err => console.log('err', err));
  };

  handleChange = e => {
    let { name, value } = e.target;
    console.log('name', name);
    console.log('value', value);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="App">
        <input
          value={this.state.dogImage}
          onChange={this.handleChange}
          name="dogImage"
        />
        <button onClick={this.addDog}>Add Favorite Dog</button>
        {this.state.favoriteDogs.map(dog => {
          return (
            <Dog
              key={dog.id}
              dog={dog}
              editDogRating={this.editDogRating}
              deleteDog={this.deleteDog}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
