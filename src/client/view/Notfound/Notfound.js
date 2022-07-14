import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import {motion } from "framer-motion";
const _ = {
    isEqual: require('lodash/isEqual'),
    isEmpty: require('lodash/isEmpty'),
    map: require('lodash/map'),
    size: require('lodash/size'),
    keys: require('lodash/keys'),
}

export class Notfound extends React.Component {
    constructor(props) {
        super(props);
        
          
    }
    
    componentDidMount(){
           
    }


    componentDidUpdate(prevProps,prevState){
         
    }
 

    render(){
        return <motion.div 
        initial={{translateX: '500px' , opacity:0} }
        animate={{ translateX: '0px', opacity:1 } }
        transition={{ duration: 0.4 , type: 'spring' }} 
        exit={{translateX: '1000px'}}
        className="notfound">
            <motion.div initial={{translateY: '-500px' , opacity:0} }
        animate={{ translateY: '0px', opacity:1 } }
        transition={{ duration: 0.5 , type: 'spring', delay: 0.05 }} 
        className="notfound__header">
                <p className="notfound__header__logoName">
                BlinkHealth</p> 
            </motion.div>
            <motion.div className="notfound__content">
                                    <FontAwesomeIcon className="notfound__content__icon" icon={faHouseMedicalCircleExclamation} />
                                    <p className="notfound__content__text"> Oops ! Page Not Found</p>
                                    <a href={"/drugs"} className="notfound__content__nav" >Go Home</a>
            </motion.div>
                </motion.div>
    }
}

Notfound.defaultProps = {}
Notfound.props={}

Notfound.componentName="Notfound"
 

export default Notfound