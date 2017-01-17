import {v1} from "uuid";
import {fromJS,Map,List} from "immutable";

//immutable js 不可变的使用Const

export const INITIAL_STATE = fromJS({
    rooms : [],
})



export function addRoom( state = INITIAL_STATE  , room ){
   if( !room  ||  !room.owner  ){
        return state;
  }
  // 更新这个state 不可变的对象
  return state.update('rooms', rooms => rooms.push(Map({
        id: room.id || v1(),  // 有的话用room.id 没有 创建
        name: room.name || 'no name'    ,
        owner: room.owner
      })
    ));
}

export function removeRoom (state, { id, user}) {
  const rooms = state.get('rooms');
  var index = rooms.findIndex( r => r.get('id') === id)
  if(index == -1 || rooms.getIn([index,'owner']) !== user ){
        console.log('———并非创建者，不能删除改房间');
        return state;
  }
  return state.update('rooms',rooms => rooms.splice(index,1));
}