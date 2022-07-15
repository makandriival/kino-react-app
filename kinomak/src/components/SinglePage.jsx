import { useState, useEffect } from "react";
import React from 'react'

export default function SinglePage(props) {
    const imgBaseUrl = 'http://image.tmdb.org/t/p/w500';
    const movie = props.clickedMovieData;
    const wArr = props.watchedArr;
    const tArr = props.toWatchArr;
    const [ wBtn , setWBtn ] = useState('add');
    const [tBtn , setTBtn] = useState('add');
    
    
    useEffect(()=>{
      wArr.includes(movie.id) == true ? setWBtn('del') : setWBtn('add');
      tArr.includes(movie.id) == true ? setTBtn('del') : setTBtn('add');
    });

    const handleBtnWatched = ()=>{
      props.handleWatched();   
      setWBtn('del');
      // console.log(wBtn);
    }
    const handleDelWatched = ()=>{
      handleDeleteWatched(movie.id);
      setWBtn('add');
      
    };

    const handleBtnToWatch = ()=>{
      props.handleToWatch();   
      setTBtn('del');
      // console.log(wBtn);
    }
    const handleDelToWatch = ()=>{
      handleDeleteToWatch(movie.id);
      setTBtn('add');
      // console.log(wBtn);
    };



    const handleDeleteWatched = (id)=>{
      const watchedListData = localStorage.getItem('listWatched');
      const watchedList = JSON.parse(watchedListData);
      const movieIdx = watchedList.indexOf(watchedList.find(elem => elem.id === id))
      watchedList.splice( movieIdx, 1);
      localStorage.setItem('listWatched' , JSON.stringify(watchedList));
      console.log(movieIdx)
    };

    const handleDeleteToWatch = (id)=>{
      const toWatchListData = localStorage.getItem('listToWatch');
      const toWatchList = JSON.parse(toWatchListData);
      const movieIdx = toWatchList.indexOf(toWatchList.find(elem => elem.id === id))
      toWatchList.splice( movieIdx, 1);
      localStorage.setItem('listToWatch' , JSON.stringify(toWatchList));
      console.log(movieIdx)
    };

  return (
    <div className='single_page'>
       <h2>{movie.title}</h2> 
      <div className="single">
       <img src={imgBaseUrl+movie.poster_path} alt={movie.title}/>
       <span>Rate: {movie.vote_average}</span>
       <p>{ movie.overview }</p>      
       <div>
           <h3>Add to:</h3>

           {wBtn === 'add' ? <> <button onClick = {()=>{handleBtnWatched()}} >Add to Watched</button> </>
           : wBtn === 'del' ? <> <button onClick={()=>{handleDelWatched()}}>Remove from Watched</button> </> 
           : alert('btn watched broken!') } 

       { tBtn ==='add' ? <button onClick = {()=>{handleBtnToWatch()}} >Add To To-Watch</button> : 
         tBtn ==='del'? <button onClick = {()=>{handleDelToWatch()}} >Remove from To-Watch</button> 
         : alert('btn to watch broken!')
       }
       

       </div>
       <button className="close_btn" onClick={()=>{props.closeSinglePage('closed')}}>X</button>
      </div>
    </div>
  )
}
