import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmouthImputs, Separator, StartCountDownButton, TaskImput } from "./styles";

export function Home(){
    
    return(
        
        <HomeContainer>
            <form action="">
                <FormContainer>
                <label htmlFor="task">
                    Vou trabalhar em
                </label>
                <TaskImput id="task" list="task-suggestions" placeholder="Dê um nome para seu projeto"/>

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
                    max={120}/>

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
                disabled
                type="submit">
                    <Play size={24}/>  
                    Começar
                </StartCountDownButton>
            
            </form>
        </HomeContainer>
       
    )
}