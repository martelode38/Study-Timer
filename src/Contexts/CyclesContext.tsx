import { createContext, ReactNode, useEffect, useReducer, useState } from "react";
import { Cycle, cyclesReducers } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface createCycleData{
    task: string;
    minutesAmount: number;
}




interface cyclesContextType{
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: String | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    CreateNewCycle: (data: createCycleData) => void;
    InterruptCurrentCycle: () => void;
}

interface cyclesContextProviderProps{
    children: ReactNode; //vc faz isso para quando o children do componente seja qualquer coisa aceia pelo react node, tanto uma div tanto um outro componente e etc
}


export const CyclesContext = createContext({} as cyclesContextType);

export function CyclesContextProvider({ children }: cyclesContextProviderProps){

    //state = estado atual, action = qual ação que o user quer realizar de alteração no estado
    const [ cyclesState, dispatch ] = useReducer(cyclesReducers,
        {
        cycles:[],
        activeCycleId: null,
    },(initialState) => {
        const storedStateAsJSON = localStorage.getItem('@ignite-feed:cycles-states');

        if( storedStateAsJSON){
            return JSON.parse(storedStateAsJSON);
        }

        return initialState;
    });
    const { cycles, activeCycleId } = cyclesState;
        //para mostrar na tela qual é o ciclo ativo
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(() => {  

        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
         return 0;
    }
    );
    useEffect(() =>{
        const stateJSON = JSON.stringify(cyclesState);

        localStorage.setItem('@ignite-feed:cycles-states', stateJSON);
    }, [cyclesState]);




     


    function CreateNewCycle(data : createCycleData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()), //essa função o date pega a data atual e o gettime pega a data atual e converte para milisegundos
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle));
      
        setAmountSecondsPassed(0);
        
    }


    function markCurrentCycleAsFinished(){

        dispatch(markCurrentCycleAsFinishedAction());
       
    }

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

    function InterruptCurrentCycle() {

        dispatch(interruptCurrentCycleAction());
   
    }


    return(
        <CyclesContext.Provider value={{
             cycles,
            activeCycle, 
            activeCycleId, 
            markCurrentCycleAsFinished,
             amountSecondsPassed,
             setSecondsPassed,
             CreateNewCycle,
             InterruptCurrentCycle}}>
                {children}

             </CyclesContext.Provider>
    )
}