import {expect} from "chai";
import {v1} from "uuid";
import {fromJS,Map,List} from "immutable";

import coreReducer  from '../../src/server/reducer';


describe("server端reducer",()=>{
  //类似array = [1,2,3,4,5];  array.reduce

    it('可以当做一个reducer', ()=>{
      var id = v1();
      var actions = [
        {type:'ADD_ROOM',room:{id,name:'1',owner:'cyn'}},
        {type:'ADD_ROOM',room:{name:'2',owner:'terry'}},
        {type:'ADD_ROOM',room:{name:'3',owner:'cyn'}},
        {type:'REMOVE_ROOM',payload:{id:id,user:'cyn'}}
      ]

      const finalState = actions.reduce(coreReducer,undefined);
      expect(finalState.get('rooms').size).to.equal(2); //添加了3个 删了1个
      expect(finalState.getIn(['rooms',0,'owner'])).to.equal('terry');//检查最终第一个房间的所有者是谁
      });
});