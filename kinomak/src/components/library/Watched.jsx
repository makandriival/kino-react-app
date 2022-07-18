import React from 'react'
import NothingHereYet from '../NothingHereYet';

export default function Watched(props) {


    const imgBaseUrl = 'http://image.tmdb.org/t/p/w500';
  // const toWatchList = JSON.parse(localStorage.getItem('listToWatch'));
  const watchedListData = localStorage.getItem('listWatched')
  const watchedList = JSON.parse(watchedListData);
  const openModal = (id)=>{
    props.openModal('open')
    const clickedMovie =  watchedList.find(elem => elem.id === id);
    props.getClickedMovie(clickedMovie);
    
  }

    const handleDelete = (id)=>{
        const movieIdx = watchedList.indexOf(watchedList.find(elem => elem.id === id))
        watchedList.splice( movieIdx, 1);
        localStorage.setItem('listWatched' , JSON.stringify(watchedList));
        // console.log(movieIdx)
      };

  return (
    <div>
        <h2>Watched!</h2>
        { watchedList === null ? <NothingHereYet/> : watchedList.map(movie =>( 
        <div className='pop_movie_list_item'>

      <div key={movie.id}  onClick = {()=>{openModal(movie.id)}}>
        <h3>{movie.title}</h3>
        <img src={imgBaseUrl + movie.poster_path} alt={movie.title} className='most_popular_img'/>
        <br />
        <span className='avg_rating'> Rate: {movie.vote_average} </span>
      </div>
        <button className='delete_btn' onClick={()=>{handleDelete(movie.id)}}>delete</button>
        </div>          
      ))}
    </div>
  )
}
