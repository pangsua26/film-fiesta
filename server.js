const express = require("express");

const mongoose = require("mongoose");
const cors= require("cors");
const routes = require("./routes");
const app = express();
require("dotenv").config();

app.use(cors());
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Connect to the Mongo DB

const uri = "mongodb+srv://pangsua26:Password@cluster0.nn8c3.mongodb.net/filmfiestaDB?retryWrites=true&w=majority";
mongoose.connect(process.env.MONGO_URI || uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected…')
})
.catch(err => console.log(err))

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist")

// {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// }
// );
// mongoose.connection.on("error", err => {
//   throw "failed connect to MongoDB";
// });

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
