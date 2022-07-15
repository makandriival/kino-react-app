import React from 'react'
import NothingHereYet from '../NothingHereYet';

export default function ToWatch(props) {


  const imgBaseUrl = 'http://image.tmdb.org/t/p/w500';
  // const toWatchList = JSON.parse(localStorage.getItem('listToWatch'));
  const toWatchListData = localStorage.getItem('listToWatch');
  const toWatchList = JSON.parse(toWatchListData);
  console.log(toWatchList);
  const openModal = (id)=>{
    props.openModal('open')
    const clickedMovie =  toWatchList.find(elem => elem.id === id);
    props.getClickedMovie(clickedMovie);
    
  }

    const handleDelete = (id)=>{
        const movieIdx = toWatchList.indexOf(toWatchList.find(elem => elem.id === id))
        toWatchList.splice( movieIdx, 1);
        localStorage.setItem('listToWatch' , JSON.stringify(toWatchList));
        // console.log(movieIdx)
      };


  return (
    <div>
      <h2>To Watch!</h2>
      { toWatchList === null ? <NothingHereYet/> : toWatchList.map(movie =>( 
        <div className='pop_movie_list_item'>
      <div key={movie.id}  onClick = {()=>{openModal(movie.id)}}>
        <h3>{movie.title}</h3>
        <img src={imgBaseUrl + movie.poster_path} alt={movie.title} className='most_popular_img'/>
        <br />
        <span className='avg_rating'> Rate: {movie.vote_average} </span>
      </div>
        <button onClick={()=>{handleDelete(movie.id)}}>delete</button>
        </div>          
      ))}
    </div>
  )
}
