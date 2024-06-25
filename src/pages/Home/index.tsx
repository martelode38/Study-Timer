import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmouthImputs, Separator, StartCountDownButton, TaskImput } from "./styles";
import { useForm, } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";


const newCyclerFormValidationSchema = zod.object({
    task: zod.string().min(1,'informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O clico precisa ter no mínimo 1 minuto').max(60, 'O ciclo pode ter no máximo 1 hora'),
})


type NewCycleFormData = zod.infer<typeof newCyclerFormValidationSchema>


interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
}

export function Home(){

    const [ cycles, setCycles ] = useState<Cycle[]>([]);
    const[ activeCycleId, setActiveCycleId ] = useState<String | null>(null); // quando inicializa a aplicação o id do ciclo é nulo, depois vira string por isso string ou nulo
    const [ amountSecondsPassed, setAmountSecondsPassed ] = useState(0);


    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCyclerFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    //para mostrar na tela qual é o ciclo ativo
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); 

    useEffect(() =>{
        let interval: number;
        if (activeCycle){
            interval = setInterval(()=>{
                setAmountSecondsPassed(
                    differenceInSeconds(new Date(), activeCycle.startDate),
                )
            
            },1000)
        }

        return()=>{
            clearInterval(interval)
        }
    }, [activeCycle])


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



    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; //variavel que vai converter o numero em minutos inserido pelo user em segundos

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(currentSeconds / 60); //essa fução vai sempre arredondar os minutos para baixo
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2,'0'); //essa função ela define um tamanho minimo para uma string e preenche o espaço q falta com u caractere que vc escolher no começo
    const seconds = String(secondsAmount).padStart(2,'0');

    useEffect(() => {
        if(activeCycle){
        document.title = `${minutes}:${seconds}`
        }
    },[minutes, seconds, activeCycle]);


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
                    step={1}
                    min={1}
                    max={60}
                    {...register('minutesAmount', {valueAsNumber:true})}
                    />

                <span>minutos.</span>
            
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
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