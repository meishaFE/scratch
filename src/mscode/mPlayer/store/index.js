import { createStore, combineReducers } from 'redux';

import locales from 'scratch-l10n';
import { detectLocale } from '@/lib/detect-locale';
import localesReducer, { initLocale, localesInitialState } from '@/reducers/locales';
import monitorLayoutReducer, { monitorLayoutInitialState } from '@/reducers/monitor-layout';

let initialState = {};
let reducers = {};

// 配置初始的语言
let initializedLocales = localesInitialState;
const locale = detectLocale(Object.keys(locales));
if (locale !== 'en') {
  initializedLocales = initLocale(initializedLocales, locale);
}

reducers = {
  locales: localesReducer,
  scratchGui: combineReducers({
    monitorLayout: monitorLayoutReducer
  })
};

initialState = {
  locales: initializedLocales,
  scratchGui: {
    monitorLayout: monitorLayoutInitialState
  }
};

const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState);

export default store;
