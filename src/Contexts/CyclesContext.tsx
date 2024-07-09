import { createContext, ReactNode, useState } from "react";

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

export const CyclesContext = createContext({} as cyclesContextType);

export function CyclesContextProvider({ children }: cyclesContextProviderProps){

    
    const [ cycles, setCycles ] = useState<Cycle[]>([]);
    const[ activeCycleId, setActiveCycleId ] = useState<String | null>(null); // quando inicializa a aplicação o id do ciclo é nulo, depois vira string por isso string ou nulo
    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0);   

        //para mostrar na tela qual é o ciclo ativo
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); 

    function markCurrentCycleAsFinished(){
        setCycles(state=>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date()};
                } else {
                    return cycle;
                }
            }),
        );
    }

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

    function InterruptCurrentCycle() {
        setCycles(state =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, interruptedDate: new Date() };
                } else {
                    return cycle;
                }
            }),
        );
    
        setActiveCycleId(null);
    }

    function CreateNewCycle(data : createCycleData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()), //essa função o date pega a data atual e o gettime pega a data atual e converte para milisegundos
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle]); //clousures: sempre bom qnd vc precisar auterar um estado e ele depende da versão anterior, é melhor o estado ser citado em estado de função
        setActiveCycleId(newCycle.id);
        setAmountSecondsPassed(0);
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