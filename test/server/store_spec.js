import {expect} from "chai";
import {v1} from "uuid";
import {fromJS,Map,List} from "immutable";

import {addRoom} from '../../src/server/actionCreator.js';
import {makeStore} from '../../src/server/store.js';


describe("server store",()=>{
    it('dispatch actions ', (done)=>{   //done是异步的
      const mockState = fromJS({
        rooms:[]
      })
      const store  = makeStore(mockState);
      // j监听store的操作变化
      store.subscribe( ()=>{
            const state = store.getState();
            expect(state.get('rooms').size).to.be.equal(1);
            done();
      });

      store.dispatch(addRoom({
          name:'聊天室',owner:'terry'
      }))

    })
});



