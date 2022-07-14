const _ = {
    isEmpty: require('lodash/isEmpty'),
    keys: require('lodash/keys')

}
export async function fetchSuggestions (searchKey){
         let suggestions = await fetch(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${searchKey}`)
         return new Promise((resolve, reject)=>{ 
            suggestions = suggestions.body.getReader()
            suggestions.read().then(({
                value,
                done
            }) => {
                if (done){
                    // Case with no suggestions for the entry
                    resolve({
                        success: true,
                        result: []
                    })
                }else{
                    // Case with suggestions for the entry
                    let uintArr = JSON.parse(new TextDecoder("utf-8").decode(new Uint8Array(value)))
                    let suggestedDrug = _.isEmpty(uintArr.suggestionGroup.suggestionList) ? "" : uintArr.suggestionGroup.suggestionList.suggestion[0]
                    if(suggestedDrug==""){
                        resolve({
                            success: true,
                            result: []
                        })
                    }else{
                         fetchDrugInfo(suggestedDrug).then((drugResponse)=>{
                            console.log("Drug response", drugResponse)
                            const {result} = drugResponse
                            resolve({
                                success: true,
                                result: result
                            })
                        })
                    }
                     // Assuming the suggestions always return array of single result
                     // IMO : This backend service is poor , to use streams instead of objects. From the perspective of this usecase I am working on I do not see the use of streams. 
                    // There is a bug in the backend service returing the response in the form of string/json. Excample: Search the response for the value 'aspirin'
                    }
                }).catch(e => {
                    reject({
                        success: false,
                        result: e.message
                    })
            })
        })
     }

     export async function fetchDrugInfo (suggestedDrug){
         let drugInformation = await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${suggestedDrug}`)
         return new Promise((resolve, reject)=>{ 
            drugInformation = drugInformation.body.getReader()
            drugInformation.read().then(({
                value,
                done
            }) => {
                if (done){
                    // Case with no suggestions for the entry
                    resolve({
                        success: true,
                        result: []
                    })
                }else{
                    // Case with suggestions for the entry
                    let drugResponse = new TextDecoder("utf-8").decode(new Uint8Array(value))
                    // let suggestedDrug = _.isEmpty(uintArr.suggestionGroup.suggestionList) ? "" : uintArr.suggestionGroup.suggestionList.suggestion[0]
                            resolve({
                                success: true,
                                result: drugResponse
                            })
                }
                
                }).catch(e => {
                    reject({
                        success: true,
                        result: e.message
                    })
            })
        })
     } 


     export async function getDrugRxidDetails (drugRxId){
        let rxIdDetails = await fetch(`https://rxnav.nlm.nih.gov/REST/rxcui/${drugRxId}/ndcs.json`)
        return new Promise((resolve, reject)=>{ 
           rxIdDetails = rxIdDetails.body.getReader()
           rxIdDetails.read().then(({
               value,
               done
           }) => {
               if (done){
                   // Case with no suggestions for the entry
                   resolve({
                       success: true,
                       result: []
                   })
               }else{
                   // Case with suggestions for the entry
                   let drugResponse = new TextDecoder("utf-8").decode(new Uint8Array(value))
                   // let suggestedDrug = _.isEmpty(uintArr.suggestionGroup.suggestionList) ? "" : uintArr.suggestionGroup.suggestionList.suggestion[0]
                           resolve({
                               success: true,
                               result: drugResponse
                           })
               }
               
               }).catch(e => {
                   reject({
                       success: true,
                       result: e.message
                   })
           })
       })
    } 