import React,{useState, useEffect} from 'react';
import Card from './Card';
import {pair_emojis, initRevealState} from '../Constants'
import {randomizeArr} from '../HelperFunctions';


const Grid = () => {
    const[flipped, setFlipped] = useState(initRevealState);
    const[randomArr, setRandomArr] = useState(pair_emojis);
    const[timerID, setTimerID] = useState(0);
    const[score, setScore] = useState(0);

    useEffect(() =>{
        const random_arr = randomizeArr(pair_emojis);
        setRandomArr(random_arr);
    },[])
    

    const toggleFlipped = (index) => {
        let flipped_copy = [...flipped];
       const flipped_count = flipped_copy.reduce((previous, current) => {
          if(current === true){
              previous++;
          }
          return previous;
        }, 0);
        if (flipped_count >= 2){
            clearTimeout(timerID);
            setTimerID(0);
            flipped_copy = [...initRevealState];
        }
        if(flipped_copy[index] === false){
            flipped_copy[index] = true;
        }
        const flipped_count_after = flipped_copy.reduce((previous, current) => {
            if(current === true){
                previous++;
            }
            return previous;
          }, 0);
          if(flipped_count_after == 2){
            const timer_id =  setTimeout(() =>{
                setFlipped(initRevealState);
              },2000)
              setTimerID(timer_id);
              setScore(score + 1);
          }
        setFlipped(flipped_copy)
    }
    return (
        <>
        <div className="cards-container">
          {flipped.map((single_data, idx) =>{
              const emoji = randomArr[idx];
              return(
                  <Card 
                   key={idx} 
                   flip={toggleFlipped} 
                   index={idx} 
                   isFlipped={single_data} 
                   emoji={emoji}
                  />
              )
          })} 
          
        </div>
        <h3 className="scorecard">Moves: {score}</h3>
        </>
    )
}

export default Grid
