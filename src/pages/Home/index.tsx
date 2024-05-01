import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmouthImputs, Separator, StartCountDownButton, TaskImput } from "./styles";
import { useForm, } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';

const newCyclerFormValidationSchema = zod.object({
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O clico precisa ter no mínimo 1 minuto').max(120, 'O ciclo precisa ter no máximo 2 horas'),
})
export function Home(){
    
    const {register, handleSubmit, watch} = useForm({
        resolver: zodResolver(newCyclerFormValidationSchema),
    });

    function handleCreateNewCycle(data : any){
        console.log(data)
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
                    max={120}
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