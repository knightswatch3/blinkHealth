import React from 'react';
import "./_Loader.scss";


export const Loader = (props)=>{
    return <div>
        {!props.loadComplete ? <div> <h1>LOADER COMPONENT</h1> </div>: props.children }
    </div>
}

export default Loader