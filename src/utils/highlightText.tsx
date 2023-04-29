import React from 'react';

export const highlightText = (text: string, input: string, className: string) => {
   return text.split('').map((char: string, index) => {
        if (input.toLowerCase().split('').includes(char.toLowerCase())) {
            return <span className={className} key={`highlight-${index}`}>{char}</span>;
        } else {
            return <span key={`highlight-${index}`}>{char}</span>;
        }
    })
}
