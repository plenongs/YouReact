import axios from 'axios';
import DATAJS from '../utils/Constant'

export const RequestsData = (url) => async (dispatch) => {
  try {
    const json = await axios.get(url);
    dispatch({
      type: DATAJS.LOAD_DATA,
      youtubeData: json.data.items,
    });
  } catch (e) {
    dispatch({
      type: DATAJS.LOAD_DATA,
      youtubeData: [],
    });
  }
}

export const Updatefrom = (data) => (dispatch) => {
  dispatch({
    type: DATAJS.LOAD_DATA,
    youtubeData: data,
  });
}

export const SearchQuery = (querys) => (dispatch) => {
  dispatch({
    type: DATAJS.QUERY,
    yquery: querys,
  });
}

export const UpdateStatus = (moo) => (dispatch) => {
  dispatch({
    type: DATAJS.P_STATUS,
    pstate: moo,
  });
}
export const UpdatePlayer = (idz, title, chan) => (dispatch) => {
  dispatch({
    type: DATAJS.PLAYER,
    pids: idz,
    ptitle: title,
    pchannel: chan,
  });
}
