import { useEffect, useRef } from "react";

import styles from "./BetPanel.module.css";


export function BetPanel(props) {
    
    const prevBalance = useRef(props.balance);

    const changeBet = (dx) => {
        let newBet = props.bet + dx;
        if (newBet < 1) {
            newBet = 1;
        } else if (newBet > props.balance) {
            newBet = props.balance;
        }
        props.setBet(newBet);
    }

    useEffect( () => {  // 10 0 (5/100)
        if (props.balance > prevBalance.current){
            changeBet(0);
        }
        prevBalance.current = props.balance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.balance])

    return (
        <>
        <div className={styles.betText}>
            {props.bet}
            {/* Ставка:  */}
            {/* <input className={styles.betInput} type="text" /> */}
        </div>
        <div>
            {/* <input type="range" /> */}
        </div>
        <div style={{
            display: "flex",
            // width: "100%",
            gap: "8px",
            height: "50px",
            margin: "0 20px 8px 20px "
            }}>
            <button className={styles.betButton} onClick={() => changeBet(-100)} style={{borderColor: '#94e2d5'}}>-100</button>
            <button className={styles.betButton} onClick={() => changeBet(-10)} style={{borderColor: '#f5c2e7'}}>-10</button>
            <button className={styles.betButton} onClick={() => changeBet(-1)} style={{borderColor: '#f9e2af'}}>-1</button>
            <button className={styles.betButton} onClick={() => props.setBet(props.balance)} style={{flex: 2}}>MAX</button>
            <button className={styles.betButton} onClick={() => changeBet(1)} style={{borderColor: '#f9e2af'}}>+1</button>
            <button className={styles.betButton} onClick={() => changeBet(10)} style={{borderColor: '#f5c2e7'}}>+10</button>
            <button className={styles.betButton} onClick={() => changeBet(100)} style={{borderColor: '#94e2d5'}}>+100</button>
        </div>
        <div style={{
            display: "flex",
            margin: "0 20px",
            gap: "8px",
            height: "50px"
            }}>
            <button className={styles.betButton} onClick={() => props.setBet(Math.round(props.balance/3))} style={{borderColor: '#eba0ac'}}>1/3</button>
            <button className={styles.betButton} onClick={() => props.setBet(Math.round(props.balance/2))} style={{borderColor: '#eba0ac'}}>1/2</button>
        </div>
        </>
    )
}
