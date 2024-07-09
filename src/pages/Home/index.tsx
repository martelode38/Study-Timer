import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./CountDown";
import * as zod from 'zod';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";




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
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as cyclesContextType);

export function Home(){

    const [ cycles, setCycles ] = useState<Cycle[]>([]);
    const[ activeCycleId, setActiveCycleId ] = useState<String | null>(null); // quando inicializa a aplicação o id do ciclo é nulo, depois vira string por isso string ou nulo
    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0);   
    
    //para mostrar na tela qual é o ciclo ativo
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); 

    const newCyclerFormValidationSchema = zod.object({
        task: zod.string().min(1,'informe a tarefa'),
        minutesAmount: zod.number().min(1, 'O clico precisa ter no mínimo 1 minuto').max(60, 'O ciclo pode ter no máximo 1 hora'),
    })

    type NewCycleFormData = Zod.infer<typeof newCyclerFormValidationSchema>


    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCyclerFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

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

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }
    


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

    

    const task = watch('task');
    const isSubmitDisable = !task;
   

    return(
        
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <CyclesContext.Provider value={{activeCycle, 
                    activeCycleId, 
                    markCurrentCycleAsFinished,
                     amountSecondsPassed,
                     setSecondsPassed}}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm/>  
                </FormProvider>                
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
                        disabled={isSubmitDisable}
                        type="submit">
                            <Play size={24}/>  
                            Começar
                    </StartCountDownButton>
                )}
            
            </form>
        </HomeContainer>
       
    )
}