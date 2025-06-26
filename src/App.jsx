import { useState, useEffect } from 'react';

import { AppHeader } from './Components/Header/AppHeader'
import { AppRoulette } from './Components/Roulette/AppRoulette';
import { BetPanel } from './Components/BetPanel/BetPanel';

import axios from 'axios';

import './index.css';


export function App() {
    const [loaded, setLoaded] = useState(false);
    const [balance, setBalance] = useState(10);
    const [betAmount, setBetAmount] = useState(1);

    useEffect(() => {
        console.log("axios post");
        axios.post(
            'https://casiton-back-production.up.railway.app/api/auth/initData', // URL эндпоинта аутентификации
            { "initData": window.Telegram.WebApp.initData } // Передаем данные для входа
        ).then(response => {
            const data = response.data;
            console.log(data)
            localStorage.setItem('jwt', data.jwt);
            setLoaded(true);
            setBalance(data.balance)
        }).catch(error => {
            console.log(error);
        });
    }, [ ]);

    if ( loaded ) {
        return (
            <div>
                <AppHeader balance={balance}/>
                <AppRoulette balance={balance} setBalance={setBalance} betAmount={betAmount}/>
                <BetPanel balance={balance} bet={betAmount} setBet={setBetAmount}/>
            </div>
        )
    } else {
        return <div>Загрузка...</div>;
    }
}
