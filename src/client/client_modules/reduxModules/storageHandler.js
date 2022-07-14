const storageHandler = {
    "loadState": ()=>{
        try{
            const serializedState = localStorage.getItem('state');
            if(serializedState==null) return undefined;
            return JSON.parse(serializedState)
        }catch(e){
            return undefined;
        }
    },
    "saveState": (state)=>{
        try{
            const serializedState = JSON.stringify(state);
            localStorage.setItem("state", serializedState);
        }catch(e){
            console.error("Failed saving state to local",e)
        }
    }
}

export default storageHandler
