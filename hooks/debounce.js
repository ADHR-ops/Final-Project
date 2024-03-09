

/**
 * useDebounce()
 *    
 * @param {string} ingredient - The first number.
 * @param {number} delay - The second number.
 * @returns {string} Debounced value.
 */
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 400) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup the previous timeout on every render
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
