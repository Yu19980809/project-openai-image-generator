const express = require( 'express' );
const { v2: cloudinary } = require( 'cloudinary' );
const Post = require( '../mongodb/models/post' );

// dotenv config
require( 'dotenv' ).config();

// cloudinary config
cloudinary.config( {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
} );

// init router
const router = express.Router();

// routes
// fetch all posts
router.get( '/', async ( req, res ) => {
  try {
    const posts = await Post.find().sort( { createdAt: -1 } );
    res.status( 200 ).json( { success: true, data: posts } );
  } catch (error) {
    res.status( 500 ).json( { success: false, message: error } );
  }
} );

// create a new post
router.post( '/', async ( req, res ) => {
  try {
    const { name, prompt, image } = req.body;
    const { secure_url } = await cloudinary.uploader.upload( image );

    const newPost = await Post.create( {
      name,
      prompt,
      image: secure_url
    } );

    res.status( 200 ).json( { success: true, data: newPost } );
  } catch (error) {
    res.status( 500 ).json( { success: false, message: error } );
  }
} );

// export
module.exports = router;
