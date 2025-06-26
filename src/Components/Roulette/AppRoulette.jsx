import { useEffect, useState } from "react";
import styles from "./AppRoulette.module.css";
import axios from 'axios';


async function rollRequest(betAmount) {
    try {
        const response = await axios.get(
            `https://127.0.0.1:8000/api/roll/${betAmount}`,
            { 
                headers: {
                   Authorization: `Bearer ${localStorage.getItem('jwt')}`     
                }
            }
        );
        // response.data.items = response.data.items.slice(100-length, 100)
        return { items: response.data.items, selected: response.data.selected, newBalance: response.data.newBalance };
    } catch (error) {
        console.log(error);
        return { items: [], selected: 2, newBalance: 0 };
    }
}

export function AppRoulette(props) {
    console.log("AppRoulette");

    // Ширина одного элемента (px)
    const itemWidth = 80;
    
    // Количество элементов в рулетке
    const [items, setItems] = useState([]);
    
    // Состояние: крутится ли рулетка сейчас
    const [isSpinning, setIsSpinning] = useState(false);
    // Смещение контейнера рулетки (в пикселях)
    const [offset, setOffset] = useState(0);
    // Состояние: анимация центрирования рулетки
    const [isCentering, setIsCentering] = useState(false);
    
    useEffect(() => {
        async function fetchItems() {
            const items = [
                ["#f38ba8", "/10"],
                ["#a6e3a1", "x5"],
                ["#6c7086", "   "],
                ["#f5c2e7", "/2"],
                ["#f5c2e7", "/2"]
            ]
            setItems(items);
        }
        fetchItems();
    }, [ ]);

    // Обработчик запуска рулетки
    const spin = async () => {
        console.log("spin");
    
        setIsSpinning(true);
    
        const { items: moreItems, selected, newBalance } = await rollRequest(props.betAmount);
        props.setBalance(props.balance-props.betAmount);
        const newItems = items; 
        newItems.push(...moreItems.slice(4, 100));
        setItems(newItems);

        // Координата, на котором должна остановиться рулетка
        const offsetCoord = itemWidth*(selected-1) // + getRandomInt(-(itemWidth/2)+5, itemWidth/2-5);
        
        setOffset(offsetCoord);

        setTimeout( () => {
            // Центрируем рамку на центральном элементе
            setIsCentering(true);
            
            // сбрасываем offset
            setTimeout( () => {
                setIsSpinning(false);
                setIsCentering(false);

                setItems(newItems.slice(selected-1, selected+4));
                
                setOffset(0);
                props.setBalance(newBalance);

            }, 300); // 300мс — длительность анимации
        }, 2500); // 2.5 секунды — длительность анимации
    };

    console.log("items", items);
    return (
        <div style={{ width: 400, margin: "40px auto", textAlign: "center" }}>
            <div className={styles.spinnerContainer} style={{"--width": itemWidth * 5 + "px"}}>
                {/* Контейнер с элементами рулетки/*} */}
                <div className={styles.itemsContainer} style={{
                        "--items-transition": isSpinning
                        ? ("transform " + (isCentering ? "0.3s" : "2.5s") + " cubic-bezier(.17,.67,.44,1.02)")
                        : "none",
                        "--items-transform": `translateX(-${offset}px)`
                    }}>
                    {items.map((item, idx) => (
                        <div key={idx} className={styles.item} style={{
                            "--color": item[0], "--width": itemWidth + "px"
                        }}>{item[1]}</div>
                    ))}
                </div>

                {/* Рамка/выделение центрального элемента  */}
                <div className={styles.selectBorder} style={{"--left": itemWidth * 2 + "px", "--width": itemWidth + "px"}}></div>
            </div>
                <button
                    onClick={spin}
                    disabled={isSpinning}
                    className={styles.button} 
                    style={{"--cursor": isSpinning ? "not-allowed" : "pointer"}}
                >
                    Крутить!
                </button>            
        </div>
    );
}