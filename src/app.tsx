import React, {useState} from 'react';

import { AutoComplete } from './components/autoComplete';
import './app.css';

const App = () => {
    const [country, setCountry] = useState<string>('')

    return (
      <div className='app'>
        <h1 className='title'>deel.</h1>
        <p className='subtitle'>Where do you want to open a Deel branch entity?</p>

        <AutoComplete value={country} onChange={setCountry}/>
      </div>
    )
};


export default App;
