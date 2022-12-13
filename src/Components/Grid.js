import React,{useState, useEffect} from 'react';
import Card from './Card';
import {pair_emojis, initRevealState} from '../Constants'
import {randomizeArr} from '../HelperFunctions';
import Confetti from 'react-confetti'


const Grid = () => {
    const[flipped, setFlipped] = useState(initRevealState);
    const[matched, setMatched] = useState(initRevealState);
    const[randomArr, setRandomArr] = useState(pair_emojis);
    const[timerID, setTimerID] = useState(0);
    const[score, setScore] = useState(0);
    const[winning, setWinning] = useState(false);

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
          if(flipped_count_after === 2){
            const selected_index = [];
            flipped_copy.forEach((single_element, idx) => {
                if(single_element){
                  selected_index.push(idx);
                }
            });
            if(randomArr[selected_index[0]] === randomArr[selected_index[1]]){
                const matched_copy = [...matched];
                matched_copy[selected_index[0]] = true;
                matched_copy[selected_index[1]] = true;
               const allMatched = matched_copy.every((single_element) => single_element === true);
               if(allMatched){
                   setWinning(true);
               }
                setMatched(matched_copy);
            }else{
                const timer_id =  setTimeout(() =>{
                    setFlipped(initRevealState);
                  },2000)
                  setTimerID(timer_id);
            }
              setScore(score + 1);
          }
        setFlipped(flipped_copy)
    }
    return (
        <>
        {winning ? <Confetti /> : false}
        <div className="cards-container">
          {flipped.map((single_data, idx) =>{
              const emoji = randomArr[idx];
              const matchedState = matched[idx];
              return(
                  <Card 
                   key={idx} 
                   flip={toggleFlipped} 
                   index={idx} 
                   isFlipped={single_data} 
                   emoji={emoji}
                   matchedState={matchedState}
                  />
              )
          })} 
          
        </div>
        <h3 className="scorecard">Moves: {score}</h3>
        {winning ? <h2>Congratulations</h2> : false}
        </>
    )
}

export default Grid
