import {expect} from "chai";
import {v1} from "uuid";
import {fromJS,Map,List} from "immutable";


//先写测试 TDD 测试驱动开发 思维比较开发 功能性的  先从函数写 在乎性能
import {
  addRoom,
  removeRoom,
}from '../../src/server/core.js'


describe("room",()=>{
    it('能够创建房间:addRoom', ()=>{
      var firstRoom = {
        name:'first room',
        id:v1(),
        owner:'cyn'
      }

      const nextState = addRoom(undefined,firstRoom); //初始的room 为空
      const rooms = nextState.get('rooms');
      expect(rooms).to.be.ok;//是否存在
      expect(rooms.get(0)).to.equal(Map(firstRoom));//room第一个对象是否为这个

      // 当名称为undefine时候 分配一个任务
      const nextNextState  = addRoom(nextState,{
        name:'second room',owner:'terry'
      });
      //进行检查
      expect(nextNextState.getIn(['rooms',1,'name'])).to.equal('second room'); // 第0个是first room
    })

    const  mockState = fromJS({
       rooms: [{'name':'first room',id:v1(), owner:'cyn'}]
    })

    it('能够被创建的人删除', ()=>{
          const state = removeRoom(mockState, {
                  id: mockState.getIn(['rooms',0,'id']),
                  user: 'cyn'
          })
          //检查下最终的结果state数组是不是空的 size imutable 方法
          expect(state.get('rooms').size ).to.equal(0);
    });


    it('不能够被其他人删除', ()=>{
          const state = removeRoom(mockState, {
                  id: mockState.getIn(['rooms',0,'id']),
                  user: 'terry'
          })
          //检查下最终的结果state数组是不是空的 size imutable 方法
          expect(state.get('rooms').size ).to.equal(1);
    });

});






/*describe("first test", ()=>{
  it("should work it out ",()=>{
      expect(1+1).to.equal(2);
  })
})*/
