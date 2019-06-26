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

  getDogImage = () => {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then(res => {
        let { message } = res.data;
        this.setState({ dogImage: message });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <RandomDogImage image={this.state.dogImage} addDog={this.addDog} />
        <button onClick={this.getDogImage}>Get Dog Image</button>
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
