const dogs = [];

let id = 1;

module.exports = {
  favoriteDogs(req, res) {
    res.status(200).send(dogs);
  },
  updateRating(req, res) {
    let { id } = req.params;
    let { newRating } = req.query;
    let index = dogs.findIndex(dog => dog.id === +id);
    dogs[index].rating = +newRating;
    res.status(200).send(dogs);
  },
  addDog(req, res) {
    // req.body will look like this. Refer to App.js to see the way that the front end passed it
    // { image: 'someimageurl'}
    let { image } = req.body;
    let newDog = {
      image,
      id,
      rating: 1
    };
    id++;
    dogs.push(newDog);
    res.status(200).send(dogs);
  },
  deleteDog(req, res) {
    let { id } = req.params;
    let index = dogs.findIndex(dog => dog.id === +id);
    index !== -1 && dogs.splice(index, 1);
    res.status(200).send(dogs);
  }
};
