const express = require("express");
const bodyparser = require("body-parser");

const db = require("./config/dbConnect.js");
const userRouter = require("./routes/api/user.js");
const genreRouter = require("./routes/api/genres.js");
const movieRouter = require("./routes/api/movies.js");
const reviewRouter = require("./routes/api/reviews.js");

const app = express();


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(genreRouter);
app.use(movieRouter);
app.use(userRouter);
app.use(reviewRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
