
export const newsActionTypes = {
    SETCURNEWSINDEX:'set-cur-news-tab'
  };

export const setCurNewsIndex = (curNewsIndex) => (dispatch) => {
    console.log("setCurNewsIndex*************",curNewsIndex)
    if(!curNewsIndex) curNewsIndex = 0
    
    return dispatch({ type: newsActionTypes.SETCURNEWSINDEX, curNewsIndex: curNewsIndex });
  }