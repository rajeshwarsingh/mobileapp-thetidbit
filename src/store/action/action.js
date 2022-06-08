
export const newsActionTypes = {
  SETCURNEWSINDEX: 'set-cur-news-tab',
  SETCURPREFLANG: 'set-cur-pref-lang',
  SETCURTAB: 'set-cur-tab'
};

export const setCurNewsIndex = (curNewsIndex) => (dispatch) => {
  if (!curNewsIndex) curNewsIndex = 0

  return dispatch({ type: newsActionTypes.SETCURNEWSINDEX, curNewsIndex: curNewsIndex });
}

export const setLang = (lang) => (dispatch) => {
  if (!lang) lang = 'en'

  return dispatch({ type: newsActionTypes.SETCURPREFLANG, curPrefLang: lang });
}

export const setTab = (curTab) => (dispatch) => {
  if (!curTab) curTab = '0'

  return dispatch({ type: newsActionTypes.SETCURTAB, curTab: curTab });
}