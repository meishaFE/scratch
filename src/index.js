/* import { compose } from 'redux';
import GUI from './containers/gui.jsx';
import AppStateHOC from './lib/app-state-hoc.jsx';
import HashParserHOC from './lib/hash-parser-hoc.jsx';
import TitledHOC from './lib/titled-hoc.jsx';

const Scratch = compose(
  AppStateHOC,
  HashParserHOC,
  TitledHOC
)(GUI); */

import MPlayer from './mscode/mPlayer/mPlayer.jsx';

export { MPlayer };
