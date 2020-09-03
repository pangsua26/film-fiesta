const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Movies collection and inserts the movies below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactreadinglist"
);

const movieSeed = [
  {
    title: "The Godfather",
    author: "Francis Ford Coppola",
    synopsis:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    date: new Date(Date.now())
  },
  {
    title: "The Shawshank Redemption",
    author: "Frank Darabont",
    synopsis:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    date: new Date(Date.now())
  },
  {
    title: "Schindler's List",
    author: "Steven Spielberg",
    synopsis:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    date: new Date(Date.now())
  },
  {
    title: "Casablanca",
    author: "Michael Curtiz",
    synopsis:
      "A cynical American expatriate struggles to decide whether or not he should help his former lover and her fugitive husband escape French Morocco.",
    date: new Date(Date.now())
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    author: "Peter Jackson",
    synopsis:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    date: new Date(Date.now())
  },
  {
    title: "Raiders of the Lost Ark",
    author: "Steven Spielberg",
    synopsis:
      "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
    date: new Date(Date.now())
  },
  {
    title: "Pulp Fiction",
    author: "Quentin Tarantino",
    synopsis:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    date: new Date(Date.now())
  },
  {
    title: "The Matrix",
    author: "Lana Wachowski",
    synopsis:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    date: new Date(Date.now())
  },
  {
    title: "Parasite",
    author: "Bong Joon Ho",
    synopsis:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    date: new Date(Date.now())
  },
  {
    title: "Avengers: Endgame",
    author: "Anthony Russo",
    synopsis:
      "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    date: new Date(Date.now())
  },
  {
    title: "Up",
    author: "Pete Docter, Bob Peterson",
    synopsis:
      "78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.",
    date: new Date(Date.now())
  },
  {
    title: "The Sixth Sense",
    author: "M. Night Shyamalan",
    synopsis:
      "A boy who communicates with spirits seeks the help of a disheartened child psychologist.",
    date: new Date(Date.now())
  },
  {
    title: "Blade Runner",
    author: "Ridley Scott",
    synopsis:
      "A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.",
    date: new Date(Date.now())
  },
  {
    title: "Kill Bill: Vol. 1",
    author: "Quentin Tarantino",
    synopsis:
      "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.",
    date: new Date(Date.now())
  },
  {
    title: "The Big Lebowski",
    author: "Joel Coen, Ethan Coen",
    synopsis:
      "Jeff \"The Dude\" Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.",
    date: new Date(Date.now())
  },
  {
    title: "The Princess Bride",
    author: "Rob Reiner",
    synopsis:
      "While home sick in bed, a young boy's grandfather reads him the story of a farmboy-turned-pirate who encounters numerous obstacles, enemies and allies in his quest to be reunited with his true love.",
    date: new Date(Date.now())
  }
];

db.Movie
  .remove({})
  .then(() => db.Movie.collection.insertMany(movieSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
