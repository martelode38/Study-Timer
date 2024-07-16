import { produce } from 'immer';
import { ActionTypes } from "./actions";

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesStates {
    cycles: Cycle[];
    activeCycleId: string | null;
}



export function cyclesReducers(state: CyclesStates, action: any) {
        
    if(action.type === ActionTypes.ADD_NEW_CYCLE){
        /*
        return{
            ...state,
            cycles: [...state.cycles,action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id, //to pegando o id do novo ciclo e setando de uma vez so
        }
         */

        return produce(state, (draft) => {
            draft.cycles.push(action.payload.newCycle);
            draft.activeCycleId = action.payload.newCycle.id
        })
    }

    if(action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE){
        /*return{
            ...state,
            cycles:
                state.cycles.map((cycle) => {
                    if (cycle.id === state.activeCycleId) {
                        return { ...cycle, interruptedDate: new Date() };
                    } else {
                        return cycle;
                    }
                }),
            
            activeCycleId:null,
        }*/
        const currentCycleIndice =state.cycles.findIndex(cycle =>{
            return cycle.id === state.activeCycleId;
        })
        
        if(currentCycleIndice < 0){
            return state
        }

        return produce(state, draft =>{
            draft.activeCycleId = null;
            draft.cycles[currentCycleIndice].interruptedDate = new Date();
        })
    }

    if(action.type === ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED){
        /*return{
            ...state,
            cycles:
                state.cycles.map((cycle) => {
                    if (cycle.id === state.activeCycleId) {
                        return { ...cycle, finishedDate: new Date() };
                    } else {
                        return cycle;
                    }
                }),
            
            activeCycleId:null,
        }*/
            const currentCycleIndice =state.cycles.findIndex(cycle =>{
                return cycle.id === state.activeCycleId;
            })
            
            if(currentCycleIndice < 0){
                return state
            }
    
            return produce(state, draft =>{
                draft.activeCycleId = null;
                draft.cycles[currentCycleIndice].finishedDate = new Date();
            })
    }
    return state;
}