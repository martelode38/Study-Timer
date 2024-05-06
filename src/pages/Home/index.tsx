import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmouthImputs, Separator, StartCountDownButton, TaskImput } from "./styles";
import { useForm, } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useState } from "react";

const newCyclerFormValidationSchema = zod.object({
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O clico precisa ter no mínimo 1 minuto').max(60, 'O ciclo pode ter no máximo 1 hora'),
})


type NewCycleFormData = zod.infer<typeof newCyclerFormValidationSchema>


interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    
}

export function Home(){

    const [cycles, setCycles] =  useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<String | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    
    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCyclerFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    const totalSeconds =  activeCycle ? activeCycle.minutesAmount *  60 : 0;
    const currentSeconds = activeCycle ? totalSeconds ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = currentSeconds

    function handleCreateNewCycle(data : NewCycleFormData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount
        }
        
        setCycles((state) => [...cycles, newCycle]);
        setActiveCycleId(newCycle.id);

        reset();
    }

    const task = watch('task');
    const isSubmitDisable = !task;

    return(
        
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                <label htmlFor="task">
                    Vou trabalhar em
                </label>
                <TaskImput 
                id="task" 
                list="task-suggestions" 
                placeholder="Dê um nome para seu projeto"
                {...register('task')}

                />

                <datalist id="task-suggestions">
                    <option value="projeto 1"/>
                </datalist>

                <label htmlFor="minutesAmount">durante</label>
                <MinutesAmouthImputs 
                    type="number"
                    id="minutesAmount"
                    placeholder="00"
                    step={5}
                    min={1}
                    max={60}
                    {...register('minutesAmount', {valueAsNumber:true})}
                    />

                <span>minutos.</span>
            
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>
                
                <StartCountDownButton
                disabled={isSubmitDisable}
                type="submit">
                    <Play size={24}/>  
                    Começar
                </StartCountDownButton>
            
            </form>
        </HomeContainer>
       
    )
}