import { FormContainer, MinutesAmouthImputs, TaskImput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../Contexts/CyclesContext";

export function NewCycleForm(){
    
    const {activeCycle} = useContext( CyclesContext);

    const { register } =  useFormContext();

    return(
        <div>

            <FormContainer>
                <label htmlFor="task">
                    Vou trabalhar em
                </label>
                <TaskImput 
                id="task" 
                list="task-suggestions" 
                placeholder="Dê um nome para seu projeto"
                disabled = {!!activeCycle}
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
                    step={1}
                    min={1}
                    max={60}
                    disabled={!!activeCycle}
                    {...register('minutesAmount', {valueAsNumber:true})}
                    />

                <span>minutos.</span>
            
            </FormContainer>
      
        </div>
    )
}