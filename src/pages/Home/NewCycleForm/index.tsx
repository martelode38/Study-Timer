import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, MinutesAmouthImputs, TaskImput } from "./styles";
import * as zod from 'zod';
import { useForm } from "react-hook-form";


const newCyclerFormValidationSchema = zod.object({
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O clico precisa ter no mínimo 1 minuto').max(60, 'O ciclo pode ter no máximo 1 hora'),
})

type NewCycleFormData = Zod.infer<typeof newCyclerFormValidationSchema>


export function NewCycleForm(){
    

    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCyclerFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });
    

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