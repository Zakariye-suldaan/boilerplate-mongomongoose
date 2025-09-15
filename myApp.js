require('dotenv').config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Zakaria",
    age: 24,
    favoriteFoods: ["pizza", "burger"]
  });

  person.save(function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
};


const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
 Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    return done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, personFound) {
    if (err) return console.log(err);
    return done(null, personFound);
  });
};

// Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, personFound) {
    if (err) return console.log(err);
    return done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, personFound) {
    if (err) return console.log(err);
    personFound.favoriteFoods.push(foodToAdd);
    personFound.save(function (err, data) {
      if (err) return console.log(err);
      return done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function (err, data) {
    if (err) return console.log(err);
    return done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) return console.log(err);
    return done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function (err, data) {
    if (err) return console.log(err);
    return done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec(function (err, data) {
      if (err) return console.log(err);
      return done(null, data);
    });
};

// ----- DO NOT EDIT BELOW THIS LINE -----
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
