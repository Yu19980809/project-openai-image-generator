import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';

const downloadImage = ( _id, image ) => {
  FileSaver.saveAs( image, `download-${ _id }.jpg` );
}

const getRandomPrompt = prompt => {
  const randomIndex = Math.floor( Math.random() * surpriseMePrompts.length );
  const randomPrompt = surpriseMePrompts[ randomIndex ];

  if ( randomPrompt === prompt ) return getRandomPrompt( prompt );

  return randomPrompt;
};

export { downloadImage, getRandomPrompt };
