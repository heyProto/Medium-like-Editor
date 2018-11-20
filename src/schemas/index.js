import { basicNodes, basicMarks } from './basic';
import citation from './citation';
import equation from './equation';
import file from './file';
import footnote from './footnote';
import iframe from './iframe';
import image from './image';
import table from './table';
import video from './video';
import highlightQuote from './highlightQuote';
import card from './card';

export const defaultNodes = {
  ...basicNodes,
  ...card,
  ...citation,
  ...equation,
  ...file,
  ...footnote,
  ...iframe,
  ...image,
  ...table,
  ...video,
  ...highlightQuote,
};

export const defaultMarks = {
  ...basicMarks,
};
