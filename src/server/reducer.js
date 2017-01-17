
//有了 reducer 和 action 之后 可以使用store了

import {
  addRoom,
  removeRoom,
}from './core.js'


export default function reducer( state,action ){
  switch (action.type){
    case "ADD_ROOM":
          return addRoom(state,action.room);
    case "REMOVE_ROOM":
          return removeRoom(state,action.payload);

  }
  return state;
}


