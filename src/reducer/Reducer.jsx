import DATAJS from '../utils/Constant'

const initialState = {
  youtubeData: [],
  youquery: undefined,
  playerid: undefined,
  playertitle: undefined,
  playerchannel: undefined,
  playerstatus: false,
}

const Reducer = (state = initialState, action) => {
  switch(action.type){
    case DATAJS.LOAD_DATA:
      return {
        ...state,
        youtubeData: action.youtubeData,
      };
    case DATAJS.QUERY:
      return {
        ...state,
        youquery: action.yquery,
      };
    case DATAJS.PLAYER:
      return {
        ...state,
        playerid: action.pids,
        playertitle: action.ptitle,
        playerchannel: action.pchannel
      };
    case DATAJS.P_STATUS:
      return {
        ...state,
        playerstatus: action.pstate,
      } ;
    default:
      return state;
  }
};

export default Reducer;