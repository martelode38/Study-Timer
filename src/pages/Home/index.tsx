import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./CountDown";



interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface cyclesContextType{
    activeCycle: Cycle | undefined;
    activeCycleId: String | null;
    markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as cyclesContextType);

export function Home(){

    const [ cycles, setCycles ] = useState<Cycle[]>([]);
    const[ activeCycleId, setActiveCycleId ] = useState<String | null>(null); // quando inicializa a aplicação o id do ciclo é nulo, depois vira string por isso string ou nulo
    
    
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

    function handleInterruptCycle() {
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
    

/*
    function handleCreateNewCycle(data : NewCycleFormData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()), //essa função o date pega a data atual e o gettime pega a data atual e converte para milisegundos
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle]); //clousures: sempre bom qnd vc precisar auterar um estado e ele depende da versão anterior, é melhor o estado ser citado em estado de função
        setActiveCycleId(newCycle.id);
        setAmountSecondsPassed(0);

        reset();
    }
*/
    

  //  const task = watch('task');
   // const isSubmitDisable = !task;
   

    return(
        
        <HomeContainer>
            <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">

                <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
                {/*<NewCycleForm/>*/}                    
                <CountDown/>
                </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountDownButton
                        onClick={handleInterruptCycle}
                        type="button">
                            <HandPalm size={24}/>  
                            Interromper
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton
                       /* disabled={isSubmitDisable}*/
                        type="submit">
                            <Play size={24}/>  
                            Começar
                    </StartCountDownButton>
                )}
            
            </form>
        </HomeContainer>
       
    )
}