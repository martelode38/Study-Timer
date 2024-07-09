import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./CountDown";
import * as zod from 'zod';
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { CyclesContext } from "../../Contexts/CyclesContext";

export function Home(){

    const{ activeCycle,CreateNewCycle,InterruptCurrentCycle } = useContext(CyclesContext);

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

    function handleCreateNewCycle(data: NewCycleFormData){
        CreateNewCycle(data);
        reset();
    }

    const task = watch('task');
    const isSubmitDisable = !task;
   

    return(
        
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

               
                <FormProvider {...newCycleForm}>
                    <NewCycleForm/>  
                </FormProvider>                
                <CountDown/>

                {activeCycle ? (
                    <StopCountDownButton
                        onClick={InterruptCurrentCycle}
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