import dotenv from 'dotenv';
import express from 'express';


/**
 * Environment Variables:
 *  NODE_ENV: 'production' | 'development'
 *  DB_ENV: 'production' | 'development' (Access collections with dev prefix)
 *  MONGO_URI: URI to access the database
 *  SECRET: JWT Secret
 */
dotenv.config();


const app = express();
app.get('/*', (req, res) => {
  res.sendFile('../client/build/index.html');
});
