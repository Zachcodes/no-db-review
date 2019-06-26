import React, { Component } from 'react';
import './App.css';
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

  // This is the only method that will pass a body in this application. That becomes req.body in the server. On an axios request, the second argument is an object that will become the body of the request.
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
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="App">
        {/* We need to be able to edit the dogImage value on state which is what this input is doing */}
        <input
          value={this.state.dogImage}
          onChange={this.handleChange}
          name="dogImage"
        />
        {/* Once the user has selected their image and updated state, they need to be able to click a button to add that dog image to their favorites array on the server. this button will invoke a function that will kick off a post request to our server */}
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
