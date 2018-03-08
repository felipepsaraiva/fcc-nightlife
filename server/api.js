const express = require('express');
const axios = require('axios');
const cors = require('cors');

const route = new express.Router();
const yelp = axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses/',
  headers: { Authorization: `Bearer ${process.env.YELP_KEY}` },
});

if (process.env.NODE_ENV === 'development') {
  route.use(cors());
}

// Request authentication
// route.use((req, res, next) => {
//   try {
//     const auth = req.get('Authorization').split(' ');
//     if (auth[0] === 'JWT') {
//       const id = jwt.decode(auth[1], process.env.SECRET).id;
//     }
//   } finally {
//     next();
//   }
// });

/**
 * Query:
 *  location: String
 *  offset: Number
 */
route.get('/search', (req, res, next) => {
  if (!req.query.location) {
    next({
      custom: true,
      status: 400,
      response: {
        error: 'BadRequest',
        message: 'The location must be provided',
      },
    });
    return;
  }

  const params = {
    categories: 'bars',
    location: req.query.location,
  };
  if (Number(req.query.offset)) params.offset = req.query.offset;

  yelp.get('search', { params }).then((response) => {
    res.json(response.data);
  }).catch(next);
});

/**
 * ERROR HANDLER
 * Error types: ServerError, AuthenticationError, InvalidIdError, BadRequest
 */
route.use((err, req, res, next) => {
  if (err.custom) {
    res.status(err.status).json(err.response);
    return;
  }

  console.error('<<<<< [ERROR] >>>>>');
  console.error(err);

  res.status(500).json({
    error: 'ServerError',
    message: 'Internal server error',
  });
});

module.exports = route;
