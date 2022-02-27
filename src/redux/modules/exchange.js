import axios from 'axios';
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// actions
const SET_EXCHANGE = "SET_EXCHANGE";


//actionCreators
const setexchange = createAction(SET_EXCHANGE, (exchangeRate) => ({ exchangeRate }));

const initialState = {
    exchangeRate: {},
};

const exchange_API = `http://api.currencylayer.com/live?access_key=bbe78818bbe72c3b0441b65c12079596&&currencies=KRW,JPY,PHP`;

const getExchageAPI = () => {
  return function (dispatch) {
    axios
      .get(exchange_API)
      .then((resp) => {
        if (resp.data ? resp.data.success === true: '') {
          // 스토어에 보내주기
          dispatch(setexchange(resp.data.quotes));
        } else {
          window.alert("데이터X");
        }
      })
      .catch((e) => console.error(e));
  };
};

export default handleActions(
    {
      [SET_EXCHANGE]: (state, action) =>
        produce(state, (draft) => {
          // 액션페이로드 data(인자명을 데이타로 정해줌)를 가져온다
          draft.exchange_money = action.payload.exchangeRate;
        }),
    },
  
    initialState
  );
  

const actionCreators = {
    getExchageAPI,
};

export { actionCreators };
