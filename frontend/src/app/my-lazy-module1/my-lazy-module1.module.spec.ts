import { MyLazyModule1Module } from './my-lazy-module1.module';

describe('MyLazyModule1Module', () => {
  let myLazyModule1Module: MyLazyModule1Module;

  beforeEach(() => {
    myLazyModule1Module = new MyLazyModule1Module();
  });

  it('should create an instance', () => {
    expect(myLazyModule1Module).toBeTruthy();
  });
});
