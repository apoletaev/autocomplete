import React from 'react';

import { AutoComplete } from './components/autoComplete';
import './app.css';

const App = () => (
    <div className='app'>
        <h1 className='title'>deel.</h1>
        <p className='subtitle'>Where do you want to open a Deel branch entity?</p>
        <AutoComplete />
    </div>
  );


export default App;
