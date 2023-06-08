const express = require( 'express' );
const cors = require( 'cors' );
const mongoose = require( 'mongoose' );
const dalleRoutes = require( './routes/dalleRoutes' );
const postRoutes = require( './routes/postRoutes' );
const connectDB = require( './mongodb' );

// dotenv config
require( 'dotenv' ).config();

// init app
const app = express();

// middleware
app.use( cors() );
app.use( express.json( { limit: '50mb' } ) );

// routes
app.use( '/api/v1/dalle', dalleRoutes );
app.use( '/api/v1/post', postRoutes );

// connect mongodb & start server
const startServer = async () => {
  const port = process.env.PORT;
  const dbUrl = process.env.MONGODB_URL;

  try {
    await connectDB( dbUrl )
    app.listen( port, () => console.log( `Server started on port ${ port }` ) );
  } catch (error) {
    console.error( error );
  }
};

startServer();
