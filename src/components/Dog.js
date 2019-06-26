import React, { Component } from 'react';

export default class Dog extends Component {
  constructor(props) {
    super();
    this.state = {
      rating: props.dog.rating,
      editing: false
    };
  }

  flipEdit = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  saveChanges = () => {
    this.flipEdit();
    this.props.editDogRating(this.state.rating, this.props.dog.id);
  };

  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.dog.rating !== this.props.dog.rating) {
      this.setState({ rating: this.props.dog.rating });
    }
  }

  render() {
    let { dog } = this.props;
    let { editing, rating } = this.state;
    return (
      <div>
        <img src={dog.image} className="dog-image" />
        {editing ? (
          <input value={rating} onChange={this.handleChange} name="rating" />
        ) : (
          <p>rating: {rating}</p>
        )}

        {editing ? (
          <button onClick={this.saveChanges}>Save Changes</button>
        ) : (
          <button onClick={this.flipEdit}>Edit Rating</button>
        )}
        <button onClick={() => this.props.deleteDog(this.props.dog.id)}>
          Delete Dog
        </button>
      </div>
    );
  }
}
