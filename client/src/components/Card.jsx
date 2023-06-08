import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ( { _id, name, prompt, image } ) => (
  <div className="relative group card shadow-card rounded-xl hover:shadow-cardhover">
    <img
      src={ image }
      alt={ prompt }
      className="w-full h-auto object-cover rounded-xl"
    />

    <div className="hidden absolute bottom-0 left-0 right-0 group-hover:flex flex-col max-h-[94.5%] m-2 p-4 bg-[#10131f] rounded-md">
      <p className="text-white text-sm overflow-y-auto prompt">{ prompt }</p>

      <div className="flex justify-between items-center gap-2 mt-5">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center w-7 h-7 text-white text-xs font-bold bg-green-700 rounded-full">{ name[0] }</div>
          <p className="text-white text-sm">{ name }</p>
        </div>

        <button
          type="button"
          onClick={ () => downloadImage( _id, image ) }
          className="bg-transparent border-none outline-none"
        >
          <img
            src={ download }
            alt="download"
            className="w-6 h-6 object-contain invert"
          />
        </button>
      </div>
    </div>
  </div>
);

export default Card;