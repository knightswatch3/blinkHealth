import PropTypes from "prop-types";
import React, {Component} from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux"
import {useHistory, useRouteMatch, useLocation} from "react-router-dom"

const _ = {
    fromPairs: require("lodash/fromPairs"),
    map: require("lodash/map"),
    mapValues: require("lodash/mapValues")
}

const reduxConnector = (Component, statesOfComponent, actionsOfComponents)=>{
    let states={}
    let actions={}
    
    statesOfComponent.forEach( componentState =>{
        states[`${componentState}`] = require(`../reduxModules/components/${componentState}/index.js`).default.states;
    })

    actionsOfComponents.forEach( componentActions=>{
        actions[`${componentActions}`] = require(`../reduxModules/components/${componentActions}/index.js`).default.actions;
    })

    const mapStateToProps = (state)=>{
        return { 
            states: _.fromPairs(
                _.map(statesOfComponent, stateComponent=>{
                    return [`${stateComponent}`, state[stateComponent]]
                })
            )
        }
    }

    const mapDispatchToProps = (dispatch)=>{
        return {
            actions: _.fromPairs(
                _.map(actionsOfComponents, actionComponent=>{
                    return [`${actionComponent}`, bindActionCreators(actions[actionComponent],dispatch)]
                })
            )
         }
    }

    class WrappedComponent extends Component {
        constructor(args){
            super(args);
        }
        render(){
            return <Component {...this.props} />
        }
    }

    Component.propTypes = {
        actions : PropTypes.shape(_.mapValues(actions, ()=> PropTypes.object.isRequired)),
        states : PropTypes.shape(_.mapValues(states, ()=> PropTypes.object.isRequired))
    }

    const ComponentName = Component.displayName || Component.name || "Component";

    WrappedComponent.displayName = `connectRedux(${ComponentName})`;

    let connectedComponent = connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
    return RouterWrapper(connectedComponent)
}

const RouterWrapper = (Component) => {
    const RouterWrapperComponent = (props) => {
      const navigate = useHistory();
      const UrlDetails = useLocation();
      return (
        <Component
          {...props}
          navigate={navigate}
          UrlDetails={UrlDetails}
          routeMatch={useRouteMatch()}
          />
      );
    };
    
    return RouterWrapperComponent;
  };

export default reduxConnector;