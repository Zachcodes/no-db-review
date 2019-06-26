import React from 'react';

export default function RandomDogImage(props) {
  if (!props.image) return null;
  return (
    <div>
      <img src={props.image} className="dog-image" />
      <button onClick={props.addDog}>Favorite Image</button>
    </div>
  );
}
