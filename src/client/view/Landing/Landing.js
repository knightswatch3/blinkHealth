import React from 'react';
import reduxConnector from '../../client_modules/utilities/reduxConnector.js'
import { motion } from "framer-motion" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
    }

    componentDidMount(){
        const {path, url} = this.props.routeMatch
        console.log("Path is", path)
        console.log("URL is", url)
    }

    componentDidUpdate(prevProps,prevState){
        // if(this.props.states.landing.get('isLoggedIn')){
            console.log("Yes change the route")
            // }
            this.props.navigate.push('/search')
    }

    handleUserChange(e){
        this.setState({username: e.target.value});
    }

    handlePwdChange(e){
        this.setState({password: e.target.value});
    }

    handleLogin(){
        console.log("Handle login clocked")
        this.props.navigate.push('/drugs/search')
        // this.props.actions.landing.handleLogin(this.state);
    }

    render(){
        return <motion.div initial={{opacity:0} }
        animate={{  opacity:1 } } transition={{duration:0.5, delay: 1}} className="container">    
                         <motion.div initial={{translateY: '-500px' , opacity:0} }
        animate={{ translateY: '0px', opacity:1 } }
        transition={{ duration: 0.1 , type: 'spring', delay: 0.8 }} 
        className="container__header">
                <p className="container__header__logoName">
                BlinkHealth</p>
            </motion.div>
            <motion.div 
            className="container__body"
        transition={{ duration: 0.5 , type: 'spring', delay: 0.05 }}>
                 
            </motion.div>
            <div 
            className="container__footer">
            <div className="container__footer__button">

                <motion.div initial={{translateX: '5px' , opacity:0} }
        animate={{ translateY: '0px', opacity:1 } }
        transition={{ duration: 0.4 , type: 'spring', delay: 1.5, repeat: Infinity }}  onClick={()=>this.handleLogin()} > 
                 <FontAwesomeIcon onClick={()=>this.handleLogin()} className="container__footer__button__Icon" icon={faCircleArrowRight} />
                </motion.div>
            </div>

            </div>
        </motion.div>
    }
}

Landing.defaultProps = {}
Landing.props={}

Landing.componentName="Landing"

export const states = ["landing"];
export const actions = ["landing"];


export default reduxConnector(Landing, states, actions);