import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const [ form, setForm ] = useState( { name: '', prompt: '', image: '' } );
  const [ generatingImg, setGeneratingImg ] = useState( false );
  const [ sharing, setSharing ] = useState( false );

  // const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    if ( !form.name || !form.prompt ) return alert( 'No name or prompt provided' );

    try {
      console.log( form );
      const str = JSON.stringify( { ...form } );
      console.log( str );
      console.log( 'str type', typeof str );
      console.log( 'image type', typeof str['image'] )

      const response = await fetch( 'https://project-openai-image-generator.onrender.com/api/v1/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { ...form } )
      } );

      await response.json();
      // navigate( '/' );
    } catch (error) {
      alert( error );
    } finally {
      setSharing( false );
    }
  };

  const handleChange = e => setForm( { ...form, [ e.target.name ]: e.target.value } );

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt( form.prompt );
    setForm( { ...form, prompt: randomPrompt } );
  };

  const generateImage = async () => {
    if ( !form.prompt ) return alert( 'Please provide prompt' );

    try {
      setGeneratingImg( true );
      const response = await fetch( 'https://project-openai-image-generator.onrender.com/api/v1/dalle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { prompt: form.prompt } )
      } );

      const data = await response.json();
      setForm( { ...form, image: `data:image/jpeg;base64,${ data.image }` } );
    } catch (error) {
      alert( error );
    } finally {
      setGeneratingImg( false );
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      {/* title */}
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="max-w[500px] mt-2 text-gray text-[16px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      {/* form */}
      <form className="max-w-3xl mt-16" onSubmit={ handleSubmit }>
        <div className="flex flex-col gap-5">
          {/* input field */}
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Iron Man"
            value={ form.name }
            handleChange={ handleChange }
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={ form.prompt }
            handleChange={ handleChange }
            isSurpriseMe
            handleSurpriseMe={ handleSurpriseMe }
          />

          {/* image */}
          <div className="relative flex justify-center items-center w-64 h-64 mt-2 p-3 text-gray-900 text-sm bg-gray-300 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            { form.image ? (
              <img
                src={ form.image }
                alt={ form.prompt }
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={ preview }
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            ) }

            { generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            ) }
          </div>

          {/* generate button */}
          <div className="flex gap-5 mt-5">
            <button
              type="button"
              onClick={ generateImage }
              className="w-full sm:w-auto px-5 py-2.5 font-medium text-center text-white text-sm bg-green-700 rounded-md"
            >
              { generatingImg ? 'Generating...' : 'Generate' }
            </button>
          </div>

          {/* submit button */}
          <div className="mt-10">
            <p className="mt-2 text-gray text-[16px]">** Once you have created the image you want, you can share it with others in the community **</p>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 font-medium text-center text-white text-sm bg-blue rounded-md"
            >
              { sharing ? 'Sharing...' : 'Share with the community' }
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default CreatePost;