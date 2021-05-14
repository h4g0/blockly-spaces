/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Main React component that includes the Blockly component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import React from 'react';
import './App.css';

import logo from './logo.svg';

import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';


import './blocks/customblocks';
import { LPGenerator } from './generator/generator';
import Model from './model/model'

import {createStore} from 'redux'

//const electron = window.require('electron')
//const ipcRenderer =  electron.ipcRenderer

/*
function sendVariables() {
      var result = ipcRenderer.sendSync('synchronous-message','sendVariables')
      console.log(result)
}
*/

class App extends React.Component {
  simpleWorkspace: any

  constructor(props: any) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = () => {
    var code = LPGenerator.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    var variables = "variables"
    //sendVariables(variables)
    console.log(code);
  }

  render() {
    return (
      <div className="App">
        <Model />
          <button onClick={this.generateCode} className="generator">Convert</button>
          <BlocklyComponent ref={this.simpleWorkspace}
          readOnly={false} trashcan={true} media={'media/'}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
          sounds={true}
          initialXml={`
<xml xmlns="http://www.w3.org/1999/xhtml">
</xml>
      `}>
            <Block type = "new_variable" />
            <Block type = "col_address" />
            <Block type = "col_junction"/>
            <Block type = "forall" />
            <Block type = "sum" />
            <Block type = "constraint" />
            <Block type = "operation" />
            <Block type = "number" />
            <Block type = "equals" />
            <Block type = "objective" />
          </BlocklyComponent>
      </div>
    );
  }
}

export default App;
