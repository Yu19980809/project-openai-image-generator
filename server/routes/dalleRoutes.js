const express = require( 'express' );
const { Configuration, OpenAIApi } = require( 'openai' );

// dotenv config
require( 'dotenv' ).config();

// init openai instance
const configuration = new Configuration( {
  apiKey: process.env.OPENAI_API_KEY
} );

const openai = new OpenAIApi( configuration );

// init router
const router = express.Router();

// routes
router.get( '/', ( req, res ) => {
  res.send( 'Hello from DALL-E' )
} );

router.post( '/', async ( req, res ) => {
  try {
    const { prompt } = req.body;

    const openaiResponse = await openai.createImage( {
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    } );

    const image = openaiResponse.data.data[0].b64_json;
    res.status( 200 ).json( { image } );
  } catch (error) {
    res.status( 500 ).send( error?.response.data.error.message || 'Something went wrong.' );
  }
} );


// export
module.exports = router;
