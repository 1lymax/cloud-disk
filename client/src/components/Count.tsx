import React, {FC, useEffect, useState} from 'react';

interface CountProps {
    number: string;
    duration: number;
}

const Count: FC <CountProps> = ({number, duration}) => {
    const [count, setCount] = useState('0');

    useEffect(() => {
        let start = 0
        const end = parseInt(number)
        if (start === end) return

        let incrementTime = (duration / end)
        let timer = setInterval(() => {
            start +=1
            setCount(String(start))
            if (start === end) clearInterval(timer)
        }, incrementTime);
    }, [number, duration])

    return (
        <div data-testid='count-elem'>
            {count}
        </div>
    );
};

export default Count;