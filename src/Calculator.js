import React from 'react';
import styled from 'styled-components';

const CalculatorGrid = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: minmax(120px, auto) repeat(5, 100px);

  button {
    cursor: pointer;
    font-size: 2rem;
    border: 1px solid grey;
    outline: none;
    background-color: rgb(255, 255, 255, .80);

    :hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }
`

const CalculatorOutput = styled.div`
  grid-column: 1 / -1;
  background-color: black;
  display: flex;
  align-itmes: flex-end;
  justify-content: space-around;
  flex-direction: column;
  padding: 10px;
  word-wrap: break-word;
  word-break: break-all;
  color: white;
  text-align: right;
`

const ACButton = styled.button`
  grid-column: span 2;
`

const EqualsButton = styled.button`
  grid-column: span 2;
`

const CurrentOperand = styled.div`
  font-size: 2rem;
`

const PreviousOperand = styled.div``

class Calculator extends React.Component {
  constructor(){
    super();
    this.state = {
      currentOperand: "",
      currentOperandDisplay: "",
      previousOperand: "",
      previousOperandDisplay: "",
      operation: undefined,
    }
  }

  appendNumber(number){
    if (this.state.previousOperand === "" && typeof this.state.currentOperandDisplay !== 'string'){
      this.setState({currentOperand: number}, () => this.updateDisplay())
      return
    }
    if (number === '.' && this.state.currentOperand.includes('.')) return
    const appendedNumber = this.state.currentOperand.toString() + number.toString();
    this.setState({currentOperand: appendedNumber}, () => this.updateDisplay())
  }

  clear(){
    this.setState({
      currentOperand: "",
      previousOperand: "",
      operation: undefined,
    }, () => this.updateDisplay())
  }

  async chooseOperation(operation){
    let computedOperand = this.state.currentOperand;
    if (this.state.currentOperand === "") return
    if (this.state.previousOperand !== "") {
      computedOperand = await this.compute();
    }
    this.setState({
      operation: operation,
      previousOperand: computedOperand,
      currentOperand: "",
    }, () => this.updateDisplay());
  }

  delete(){
    const truncatedNumber = this.state.currentOperand.toString().slice(0, -1)
    this.setState({currentOperand: truncatedNumber}, () => this.updateDisplay())
  }

  compute() {
    let computation
    const previous = parseFloat(this.state.previousOperand)
    const current = parseFloat(this.state.currentOperand)
    if (isNaN(previous) || isNaN(current)) return;
    switch(this.state.operation) {
      case "÷":
        computation = previous / current;
        break;
      case "*":
        computation = previous * current;
        break
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      default:
        return;
    }
    this.setState(
      {currentOperand: computation, operation: undefined, previousOperand: ""},
      () => this.updateDisplay()
    )
    return computation
  }

  updateDisplay(){
    this.setState({currentOperandDisplay: this.state.currentOperand})
    if(this.state.operation != null){
      this.setState({
        previousOperandDisplay: `${this.state.previousOperand} ${this.state.operation}`
      })
    } else {
      this.setState({previousOperandDisplay: this.state.previousOperand})
    }
  }

  render(){
    const {currentOperandDisplay, previousOperandDisplay} = this.state;

    return (
    <CalculatorGrid>
      <CalculatorOutput>
        <PreviousOperand>{previousOperandDisplay}</PreviousOperand>
        <CurrentOperand>{currentOperandDisplay}</CurrentOperand>
      </CalculatorOutput>
      <ACButton onClick={()=>this.clear()}>AC</ACButton>
      <button onClick={()=>this.delete()}> DEL</button>
      <button onClick={()=>this.chooseOperation("÷")}>÷</button>
      <button onClick={()=>this.appendNumber("1")}>1</button>
      <button onClick={()=>this.appendNumber("2")}>2</button>
      <button onClick={()=>this.appendNumber("3")}>3</button>
      <button onClick={()=>this.chooseOperation("*")}>*</button>
      <button onClick={()=>this.appendNumber("4")}>4</button>
      <button onClick={()=>this.appendNumber("5")}>5</button>
      <button onClick={()=>this.appendNumber("6")}>6</button>
      <button onClick={()=>this.chooseOperation("+")}>+</button>
      <button onClick={()=>this.appendNumber("7")}>7</button>
      <button onClick={()=>this.appendNumber("8")}>8</button>
      <button onClick={()=>this.appendNumber("9")}>9</button>
      <button onClick={()=>this.chooseOperation("-")}>-</button>
      <button onClick={()=>this.appendNumber(".")}>.</button>
      <button onClick={()=>this.appendNumber("0")}>0</button>
      <EqualsButton onClick={()=>this.compute()}>=</EqualsButton>
    </CalculatorGrid>

    )
  }
}

export default Calculator
