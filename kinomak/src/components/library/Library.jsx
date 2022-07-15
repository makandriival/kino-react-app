import React, { useState } from 'react'
import Watched from './Watched';
import ToWatch from './ToWatch';


export default function Library(props) {


  return (

    <div>
      <button onClick={()=>{props.setLibNav('watched')}} >Watched</button>
      <button onClick={()=>{props.setLibNav('to_watch')}}>To Watch</button>

      {props.libNav === 'watched' ? <Watched openModal={props.openModal} getClickedMovie={props.getClickedMovie} /> 
      : <ToWatch openModal={props.openModal} getClickedMovie={props.getClickedMovie} />}

      </div>
      
  )
}
