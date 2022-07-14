import React from 'react';
import reduxConnector from '../../client_modules/utilities/reduxConnector.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {motion} from "framer-motion";


const _ = {
    isEqual: require('lodash/isEqual'),
    isEmpty: require('lodash/isEmpty'),
    map: require('lodash/map'),
    size: require('lodash/size'),
    keys: require('lodash/keys'),
    split: require('lodash/split'),
    replace: require('lodash/replace'),
    
}

export class Drugs extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            searchKey:""
         }
         this.handleSearchChange = this.handleSearchChange.bind(this);

         this.navigateToDetails = this.navigateToDetails.bind(this);

         
    }
    handleSearchChange(e){
        this.setState({ searchKey: e.target.value });
    }

    navigateToDetails(drug){
        console.log("Pushing to URL", drug)
        this.props.navigate.push(`/drugs/${drug['rxcui']}?name=${drug['name']}&synonym=${drug['synonym']}&rxcui=${drug['rxcui']}`)
    }

    componentDidMount(){
    }


    componentDidUpdate(prevProps,prevState){
         if(!_.isEqual(prevState.searchKey,this.state.searchKey) && this.state.searchKey.length!==0){
            this.props.actions.drugs.handleSearchByKey(this.state.searchKey)
            console.log("lkashdlkfjasd, ", this.props.states.drugs.get('searchResultsByDrugName'))
         }
    }
 

    render(){
         
        const suggestions = this.props.states.drugs.get('searchResultsByDrugName').toJS()
 
        return <motion.div initial={{translateX: '500px' , opacity:0} }
        animate={{ translateX: '0px', opacity:1 } }
        transition={{ duration: 0.40 , type: 'spring' }} 
        exit={{translateX: '1000px'}}
        className="srchcntnr">
            <motion.div initial={{translateY: '-500px' , opacity:0} }
        animate={{ translateY: '0px', opacity:1 } }
        transition={{ duration: 0.5 , type: 'spring', delay: 0.05 }} 
        className="srchcntnr__header">
                <p className="srchcntnr__header__logoName">
BlinkHealth</p>
                <p className="srchcntnr__header__pageTitle">
                Drugs Search
                </p>
            </motion.div>
            <motion.div  initial={{translateY: '-500px' , opacity:0} }
        animate={{ translateY: '0px', opacity:1 } }
        transition={{ duration: 1 ,delay: 0.5, type: 'spring' }} 
        className="srchcntnr__holder">
                <div className="srchcntnr__holder__inner">
                    <p className="srchcntnr__holder__inner__text">Search your drugs</p>
                    <div className="srchcntnr__holder__inner__holder">

                        <input list="suggestions" className="srchcntnr__holder__inner__holder__search" type="text" onChange={(e) => { this.handleSearchChange(e); } } />
                        
                    <button className="srchcntnr__holder__inner__holder__btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
                
                {!_.isEmpty(this.state.searchKey) && <motion.div initial={{ opacity:0} }
        animate={{  opacity:1 } }
        transition={{ duration: 0.25 }} 
        exit={{translateX: '1000px'}}className="srchcntnr__holder__suggestions">
                    <div className="srchcntnr__holder__suggestions__text">
                        Suggestions
                    </div>
                <div className="srchcntnr__holder__suggestions__searchList" id="suggestions">
                             {_.isEmpty(suggestions) && !_.isEmpty(this.state.searchKey)? 
                             <li className="srchcntnr__holder__suggestions__searchList__optionNone" >None Found</li> : _.map(suggestions, (suggestion,sIndex) =>  <li
                             className="srchcntnr__holder__suggestions__searchList__option"
                                key={sIndex}
                                    onClick={()=>this.navigateToDetails(suggestion)}
                                    >{_.replace(JSON.stringify(suggestion['name']),'"','')}</li>
                             )}
                    </div>
                </motion.div>}
        </motion.div> 
        </motion.div>
    }
}

Drugs.defaultProps = {}
Drugs.props={}

Drugs.componentName="Drugs"

export const states = ["drugs"];
export const actions = ["drugs"];


export default reduxConnector(Drugs, states, actions);