import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../Contexts/CyclesContext";


export function CountDown(){
    const{activeCycle, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed} = useContext(CyclesContext);


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; //variavel que vai converter o numero em minutos inserido pelo user em segundos


    useEffect(() =>{
        let interval: number;
        if (activeCycle){
            interval = setInterval(()=>{
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);


                if(secondsDifference >= totalSeconds){
                    markCurrentCycleAsFinished();
                    setSecondsPassed(totalSeconds);
                    clearInterval(interval)
                }else{
                    setSecondsPassed(secondsDifference);

                }

            },1000)
        }

        return()=>{
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycle, markCurrentCycleAsFinished, setSecondsPassed])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60); //essa fução vai sempre arredondar os minutos para baixo
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2,'0'); //essa função ela define um tamanho minimo para uma string e preenche o espaço q falta com u caractere que vc escolher no começo
    const seconds = String(secondsAmount).padStart(2,'0');

    useEffect(() => {
        if(activeCycle){
        document.title = `${minutes}:${seconds}`
        }
    },[minutes, seconds, activeCycle]);


    return(
        <div>

            <CountdownContainer>
                <span>{minutes[0]}</span>
                <span>{minutes[1]}</span>
                <Separator>:</Separator>
                <span>{seconds[0]}</span>
                <span>{seconds[1]}</span>
            </CountdownContainer>
        </div>
    )
}