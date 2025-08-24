import DATAJS from '../utils/Constant'

const initialState = {
  youtubeData: [],
  youquery: undefined,
  playerid: undefined,
  playertitle: undefined,
  playerchannel: undefined,
  playerstatus: false,
  updates: false,
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
    case DATAJS.UPDATES:
      return {
        ...state,
        updates: action.upds
      }
    default:
      return state;
  }
};

export default Reducer;