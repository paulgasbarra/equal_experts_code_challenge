import React from 'react';
import Enzyme, { mount, shallow } from "enzyme";
import Calculator from "./Calculator";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter})

describe("Calculator component", () => {

  test("renders", () => {
    const wrapper = shallow(<Calculator/>);
    expect(wrapper.exists()).toBe(true);
  })

  test("appends numbers", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.instance().appendNumber('1');
      expect(wrapper.state().currentOperand).toBe('1')
  })

  test("appends a second number to a number", ()=>{
    const wrapper = mount(<Calculator/>);
    wrapper.instance().appendNumber('1');
    wrapper.instance().appendNumber('1');
    expect(wrapper.state().currentOperand).toBe('11')
  })

  test("appends only one decimal place to number", () => {
    const wrapper = mount(<Calculator/>);
    wrapper.instance().appendNumber('1');
    wrapper.instance().appendNumber('.');
    wrapper.instance().appendNumber('.');
    expect(wrapper.state().currentOperand).toBe('1.')
  })

  test("clears the state", () => {
    const wrapper = mount(<Calculator/>);
    wrapper.setState({
      currentOperand: "1234",
      previousOperand: "1234",
      operation: "+"
    })
    wrapper.instance().clear()
    expect(wrapper.state().currentOperand).toBe('')
    expect(wrapper.state().previousOperand).toBe('')
    expect(wrapper.state().operation).toBe(undefined)
  })

  test("will not set operation if no currentOperand", () => {
    const wrapper = mount(<Calculator/>);
    wrapper.instance().chooseOperation("+");
    expect(wrapper.state().operation).toBe(undefined)
  })

  test("delete will remove the last appended number from the currentOperand", () =>{
    const wrapper = mount(<Calculator/>);
    wrapper.instance().appendNumber("22")
    wrapper.instance().delete()
    expect(wrapper.state().currentOperand).toBe('2')
  })

  test("compute will change previousOperand and currentOperand to floats", () => {

  })

  test("compute will change return if currentOperand or previousOperand are NaN", () => {

  })

  test("compute will perform current operation on currentOperand and previousOperand", () => {

  })




})
