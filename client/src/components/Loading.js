import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components';
import { wobble } from 'react-animations';
import './css/loading.css';
 
const wobbleDance = keyframes`${wobble}`;
 
const BouncyDiv = styled.div`
  animation: infinite 5s ${wobbleDance};
`;


 class Loading extends Component {
    render() {
        return (
    
      <div className="test">
    <BouncyDiv>
    <h1 className="text-center">
      Counting Sheeps...
       </h1>
    </BouncyDiv>
      </div>

        )
    }
}

export default Loading;