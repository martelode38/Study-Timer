import { createContext, ReactNode, useReducer, useState } from "react";

interface createCycleData{
    task: string;
    minutesAmount: number;
}

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
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

interface CyclesStates {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export const CyclesContext = createContext({} as cyclesContextType);

export function CyclesContextProvider({ children }: cyclesContextProviderProps){

    //state = estado atual, action = qual ação que o user quer realizar de alteração no estado
    const [ cyclesState, dispatch ] = useReducer((state: CyclesStates, action: any) => {
        
        if(action.type === 'ADD_NEW_CYCLE'){
            return{
                ...state,
                cycles: [...state.cycles,action.payload.newCycle],
                activeCycleId: action.payload.newCycle.id, //to pegando o id do novo ciclo e setando de uma vez so
            }
        }

        if(action.type === 'INTERRUPT_CURRENT_CYCLE'){
            return{
                ...state,
                cycles:
                    state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                            return { ...cycle, interruptedDate: new Date() };
                        } else {
                            return cycle;
                        }
                    }),
                
                activeCycleId:null,
            }
        }

        if(action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED'){
            return{
                ...state,
                cycles:
                    state.cycles.map((cycle) => {
                        if (cycle.id === state.activeCycleId) {
                            return { ...cycle, finishedDate: new Date() };
                        } else {
                            return cycle;
                        }
                    }),
                
                activeCycleId:null,
            }
        }
        return state;
    },{
        cycles:[],
        activeCycleId: null,
    });

    const { cycles, activeCycleId } = cyclesState;

    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0);  

        //para mostrar na tela qual é o ciclo ativo
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); 


    function CreateNewCycle(data : createCycleData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()), //essa função o date pega a data atual e o gettime pega a data atual e converte para milisegundos
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload:{
                newCycle,
            },
        });
      
        setAmountSecondsPassed(0);
        
    }


    function markCurrentCycleAsFinished(){

        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload:{
                activeCycleId,
            },
        });
       
    }

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

    function InterruptCurrentCycle() {

        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload:{
                activeCycleId,
            },
        });
   
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