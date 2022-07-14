
import creds from "Assets/credentials/credentials.json";

export default {
    authenticationCheck: function({username, password}) {
        console.log("api call received username as", username, "password as", password);
        return new Promise((resolve,reject)=>{
            if(username == creds.username && password == creds.password)
                resolve(true);
            else
                reject(false);
        }).catch(e =>{
            console.error("Error",e);
                }
        )}
    }