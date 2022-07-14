import React from 'react';
import reduxConnector from '../../client_modules/utilities/reduxConnector.js'
import { motion } from "framer-motion"
 
const _ = {
    isEqual: require('lodash/isEqual'),
    isEmpty: require('lodash/isEmpty'),
    map: require('lodash/map'),
    size: require('lodash/size'),
    keys: require('lodash/keys'),
    split: require('lodash/split'),
    size: require('lodash/size'),
}

export class DrugsDetails extends React.Component {
    constructor(props) {
        super(props);
        
          
    }
    
    componentDidMount(){
            const {path, url} = this.props.routeMatch
           this.props.actions.drugs.getDrugRxidInformation(_.split(url,'/')[2])
    }


    componentDidUpdate(prevProps,prevState){
         
    }
 

    render(){
        const ndcList = this.props.states.drugs.get('rxIdResults').toJS()
        const {search} = this.props.UrlDetails
        const queries = new URLSearchParams(search);
        
        return <motion.div 
        initial={{translateX: '500px' , opacity:0} }
        animate={{ translateX: '0px', opacity:1 } }
        transition={{ duration: 0.4 , type: 'spring' }} 
        exit={{translateX: '1000px'}}
        className="detailscntr">
            <motion.div initial={{translateY: '-500px' , opacity:0} }
        animate={{ translateY: '0px', opacity:1 } }
        transition={{ duration: 0.5 , type: 'spring', delay: 0.05 }} 
        className="detailscntr__header">
                <p className="detailscntr__header__logoName">
                BlinkHealth</p>
                <p className="detailscntr__header__pageTitle">
                Drug Details
                </p>
            </motion.div>
            
            <motion.div initial={{translateY: '-300px' , opacity:0} }
        animate={{ translateY: '0px', opacity:1 } }
        transition={{ duration: 0.4, delay: 0.5 , type: 'spring' }}  className="detailscntr__drugDetails">
                    <button className="detailscntr__drugDetails__nav" onClick={()=>this.props.navigate.push(`/drugs/search`)}> Back to Search </button>
                <div className="detailscntr__drugDetails__row">
                <div className="detailscntr__drugDetails__row__left">
                    ID
                    </div>
                    <div className="detailscntr__drugDetails__row__right">
                        {queries.get('rxcui')}
                    </div> 

                </div>
                <div className="detailscntr__drugDetails__row">
                <div className="detailscntr__drugDetails__row__left">
                    NAME
                    </div>
                    <div className="detailscntr__drugDetails__row__right">
                        {queries.get('name')}
                    </div> 

                </div>
                <div className="detailscntr__drugDetails__row">
                <div className="detailscntr__drugDetails__row__left">
                    SYNONYMN
                    </div>
                    <div className="detailscntr__drugDetails__row__right">
                        {queries.get('synonym')}
                    </div> 

                </div>
                 
            </motion.div>
            <motion.div initial={{translateY: '300px' , opacity:0} }
        animate={{ translateY: '0px', opacity:1 } }
        transition={{ duration: 0.75, delay: 0.5 , type: 'spring' }} className="detailscntr__drugDetails">
            
                 {((ndcList['ndcGroup']!==undefined) && (ndcList['ndcGroup']['ndcList']!==undefined)) ? (<div className="detailscntr__drugDetails__container">
                 <p className="detailscntr__drugDetails__count"> 
                    ({_.size(_.split(ndcList['ndcGroup']['ndcList']['ndc'],','))}) NDC(s) Found:
                    </p>
                        {
                        _.map(_.split(ndcList['ndcGroup']['ndcList']['ndc'],','), ndc => {
                            return <div className="detailscntr__drugDetails__container__list">
                                {ndc}
                            </div>
                        })
                        }
                 </div>): <p className="detailscntr__drugDetails__container__empty">NO NDCs FOUND</p>}
                 
            </motion.div>
        </motion.div>
    }
}

DrugsDetails.defaultProps = {}
DrugsDetails.props={}

DrugsDetails.componentName="DrugsDetails"

export const states = ["drugs"];
export const actions = ["drugs"];


export default reduxConnector(DrugsDetails, states, actions);