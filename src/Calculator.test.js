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

  test("state is set", () => {
    const wrapper = mount(<Calculator/>);
    expect(wrapper.state().currentOperand).toBe("");
  })

  describe("appendNumber()", () => {
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

    test("will replace computed number with new number", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.instance().appendNumber('1');
      wrapper.instance().chooseOperation('+');
      wrapper.instance().appendNumber('1');
      wrapper.instance().compute()
      wrapper.instance().appendNumber('5');
      expect(wrapper.state().currentOperandDisplay).toBe('5')
    })
  })

  describe("clear()", () => {

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

  });

  describe("chooseOperation()", () => {
    test("will not set operation if no currentOperand", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.instance().chooseOperation("+");
      expect(wrapper.state().operation).toBe(undefined)
    })

    test("will call compute() if there is a previousOperand", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.setState({previousOperand: "1", currentOperand: "1"});
      const instance = wrapper.instance();
      jest.spyOn(instance, 'compute');
      wrapper.instance().chooseOperation("+");
      expect(instance.compute).toHaveBeenCalled();
    })

    test("will set this.state.operation to chosen operation", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.instance().appendNumber("1");
      wrapper.instance().chooseOperation("+");
      expect(wrapper.state().operation).toBe("+");
    })

    test("will set this.state.previousOperand to this.currentOperand", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.instance().appendNumber("2");
      wrapper.instance().chooseOperation("+");
      expect(wrapper.state().previousOperand).toBe("2");
    })

    test('will set this.currentOperand to "" ', () => {
      const wrapper = mount(<Calculator/>);
      wrapper.instance().appendNumber("2");
      wrapper.instance().chooseOperation("+");
      expect(wrapper.state().currentOperand).toBe("");
    })

    test('will set previousOperandDisplay to computed value if previous operation', () => {
      const wrapper = mount(<Calculator/>);
      wrapper.setState({
        currentOperand: "1",
        previousOperand: "1",
        operation: "+"
      })
      wrapper.instance().chooseOperation("+");
      expect(wrapper.state().previousOperandDisplay).toBe("2 +");
    })
  })

  describe("delete()", () => {
    test("delete will remove the last appended number from the currentOperand", () =>{
      const wrapper = mount(<Calculator/>);
      wrapper.instance().appendNumber("22")
      wrapper.instance().delete()
      expect(wrapper.state().currentOperand).toBe('2')
    })
  })

  describe("compute()", () => {
    test("will change previousOperand and currentOperand to floats", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.setState({previousOperand: "1", currentOperand: "2", operation: "+"});
      wrapper.instance().compute();
      expect(wrapper.state().currentOperand).toBe(3)
    })

    test("will change return if currentOperand or previousOperand are NaN", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.setState({previousOperand: "a", currentOperand: "a", operation: "+"});
      wrapper.instance().compute();
      expect(wrapper.state().currentOperand).toBe("a")
    })

    test("will perform current operation on currentOperand and previousOperand", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.setState({previousOperand: "1", currentOperand: "2", operation: "+"});
      wrapper.instance().compute();
      expect(wrapper.state().currentOperand).toBe(3)
    })

    test("will reset operation and previousOperand", () => {
      const wrapper = mount(<Calculator/>);
      wrapper.setState({previousOperand: "1", currentOperand: "2", operation: "+"});
      wrapper.instance().compute();
      expect(wrapper.state().operation).toBe(undefined)
      expect(wrapper.state().previousOperand).toBe("")
    })
  })

  describe("updateDisplay()", ()=> {

    test('will update currentOperandDisplay', ()=> {
      const wrapper = mount(<Calculator/>)
      wrapper.setState({currentOperand: '1'})
      wrapper.instance().updateDisplay();
      expect(wrapper.state().currentOperandDisplay).toBe("1")
    })

    test('will add operand to previousOperandDisplay string', ()=> {
      const wrapper = mount(<Calculator/>)
      wrapper.setState({currentOperand: '1'})
      wrapper.instance().chooseOperation("+");
      expect(wrapper.state().previousOperandDisplay).toBe("1 +")
    })

  })

})
