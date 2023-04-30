import React, {useEffect, useState, useRef, SetStateAction} from 'react';

import { useOnClickOutside} from '../../hooks/useOnClickOutside';
import { useDebounce } from '../../hooks/useDebounce';
import { useFetchData } from '../../utils/useFetchData';
import { dataNormalize } from '../../utils/dataNormalize';
import { highlightText } from "../../utils/highlightText";

import './autoComplete.css';

// TODO: check keyboard controls
// TODO: replace loading text with loader image
// TODO: check if animations and translations are needed
// TODO: modify input to accept strings only

type AutocompleteProps = {
    value: string
    onChange: React.Dispatch<SetStateAction<string>>
}

export const AutoComplete = ({value, onChange}:AutocompleteProps) => {
    const [isSelected, setIsSelected]=useState<boolean>(false)

    const {data, isError, isLoading, executeFetchData, clearData, clearError} = useFetchData()

    const debouncedCountry = useDebounce(value, 500);

    useEffect(
        () => {
            // Make sure we have a value (user has entered something in input)
            if (debouncedCountry && !isSelected) {
                executeFetchData(`https://restcountries.com/v3.1/name/${debouncedCountry.toLowerCase()}?fields=name`)
            } else {
                clearData();
                clearError();
            }
        },
        // eslint-disable-next-line
        [debouncedCountry]
    );

    const dataNormalized = dataNormalize(data, value);

    const ref = useRef<HTMLInputElement>(null)
    const handleClear = () => {
        onChange('');

        setIsSelected(false);

        clearData();
    }

    const selectHandler = (result: string) => {
        onChange(result);

        setIsSelected(true);

        clearData();
    }

    useOnClickOutside({ref, handler: isSelected ? () => {} : handleClear})

    return (
        <div className='root' ref={ref}>
            <form className='form'>
                <input
                    className={`input ${!!dataNormalized.length && 'input-active'}`}
                    type="text"
                    value={value}
                    onChange={e => {
                        onChange(e.target.value);
                    }}
                    placeholder="Country"
                    required
                    data-testid='input'
                />
                {(value || isSelected) && <button type='button' className='clear' onClick={handleClear}>x</button>}
            </form>

            {!!dataNormalized.length && (
                <div className='list-wrapper'>
                    <ul className='list'>
                        {dataNormalized.map((result: string, index: number) => (
                            <li key={`list-item-${index}`} className='list-item' onClick={() => selectHandler(result)}>
                                {highlightText(result, value, 'highlight')}
                            </li>
                        ))}
                    </ul>
                </div>
                )}
            {isLoading && (<div className='message'>Loading...</div>)}
            {!isLoading && isError && (<div className='message'>Country not found</div>)}
        </div>
    )
}
