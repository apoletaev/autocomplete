import React, {useState, useEffect, useRef} from 'react';

import { useOnClickOutside} from '../../hooks/useOnClickOutside';
import { getData } from '../../utils/getData';
import { dataNormalize } from '../../utils/dataNormalize';
import { highlightText } from "../../utils/highlightText";

import './autoComplete.css';

export const AutoComplete = () => {
    const [country, setCountry] = useState<string>('')
    const [data, setData] = useState<string[]>([])
    const [isSelected, setIsSelected]=useState<boolean>(false)

    useEffect(()=> {
        if(country){
            const fetchData = async () =>{
                const data = await getData(`https://restcountries.com/v3.1/name/${country}?fields=name`);

                setData(dataNormalize(data, country));
            }

            fetchData();
        } else {
            setData([]);
        }
    },[country])

    const ref = useRef<HTMLInputElement>(null)
    const handleClear = () => {
        setCountry('');

        setIsSelected(false);
    }

    const selectHandler = (result: string) => {
        setCountry(result);

        setIsSelected(true);

        setData([]);
    }

    useOnClickOutside({ref, handler: isSelected ? () => {} : handleClear})

    return (
        <div className='root' ref={ref}>
            <form className='form'>
                <input
                    className={`input ${!!data.length && 'input-active'}`}
                    type="text"
                    value={country}
                    onChange={e => {
                        setCountry(e.target.value)

                        if(isSelected){
                            setIsSelected(false)
                        }
                    }}
                    placeholder="Country"
                    required
                    data-testid='input'
                />
                {(country || isSelected) && <button type='button' className='clear' onClick={handleClear}>x</button>}
            </form>

            {!!data.length && (
                <div className='list-wrapper'>
                    <ul className='list'>
                        {data.map((result, index) => (
                            <li key={`list-item-${index}`} className='list-item' onClick={() => selectHandler(result)}>
                                {highlightText(result, country, 'highlight')}
                            </li>
                        ))}
                    </ul>
                </div>
                )}
            {!data.length && country && !isSelected && (<div className='message'>Country not found</div>)}
        </div>
    )
}
