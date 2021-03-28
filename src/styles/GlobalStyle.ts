import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    background-color: #121212;
    color: #e7e7e7;
  }
  
  //input {
  //  margin: 10px;
  //  padding: 10px;
  //  background-color: rgba(0,0,0,0.1);
  //  border-top: none;
  //  border-left: none;
  //  border-right: none;
  //  border-bottom: 2px solid #5a4f7c;
  //  color: #e7e7e7;
  //}
  
  button {
    padding: 10px;
    border: none;
    background-color: #5a4f7c;
    color: white;
    height: 52px;
    width: 150px;
    font-size: 20px;
    font-weight: bold;
  }
  
  #header {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1%;
  }
`
