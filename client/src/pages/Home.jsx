import { useState, useEffect } from 'react';
import { Card, FormField, Loader } from '../components';

const ImageCard = ( { data, title } ) => {
  if ( data?.length > 0 ) {
    return (
      data.map( post => <Card key={ post._id } { ...post } /> )
    )
  }

  return (
    <h2 className="mt-5 font-bold text-blue text-xl uppercase">{ title }</h2>
  )
};

const Home = () => {
  const [ loading, setLoading ] = useState( false );
  const [ searchText, setSearchText ] = useState( '' );
  const [ searchResults, setSearchResults ] = useState( [] );
  const [ allPosts, setAllPosts ] = useState( [] );
  const [ searchTimeout, setSearchTimeout ] = useState( null );

  useEffect( () => {
    fetchAllPosts();
  }, [] );

  const fetchAllPosts = async () => {
    setLoading( true );

    try {
      const response = await fetch( 'https://project-openai-image-generator.onrender.com/api/v1/post' );

      if ( response.ok ) {
        const result = await response.json();
        setAllPosts( result.data );
      }
    } catch (error) {
      alert( error );
    } finally {
      setLoading( false );
    }
  };

  const handleSearchChange = e => {
    clearTimeout( searchTimeout );
    setSearchText( e.target.value );

    setSearchTimeout(
      setTimeout( () => {
        const searchResults = allPosts.filter( post => post.name.toLowerCase().includes( searchText.toLowerCase() ) );
        setSearchResults( searchResults );
      }, 500 )
    );
  };

  return (
    <section>
      {/* title */}
      <div>
        <h1 className="text-[#222328] font-extrabold text-[32px]">The Community Showcase</h1>
        <p className="max-w[500px] mt-2 text-gray text-[16px]">Browse through a collection of imaginative and visually stunning images generated by DALL-E AI</p>
      </div>

      {/* search */}
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="searchText"
          placeholder="Search something..."
          value={ searchText }
          handleChange={ handleSearchChange }
        />
      </div>

      {/* images */}
      <div className="mt-10">
        { loading ? (
          // show loader when loading images
          <div>
            <Loader />
          </div>
        ) : (
          <>
            {/* show text when searching */}
            { searchText && (
              <h2>Showing results for <span className="text-[#222328]">{ searchText }</span></h2>
            ) }

            {/* show all (searched) images */}
            <div>
              { searchText ? (
                <ImageCard
                  data={ searchResults }
                  title="No Search Results Found."
                />
              ) : (
                <ImageCard
                  data={ allPosts }
                  title="No Posts Yet"
                />
              ) }
            </div>
          </>
        ) }
      </div>
    </section>
  )
}

export default Home;