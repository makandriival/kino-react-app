// import React, { useEffect, useState } from 'react'
import Pagination from "../Pagination";


export default function Search(props) {
// console.log('swrach term - ' + props.keyWord)

const imgBaseUrl = 'http://image.tmdb.org/t/p/w500';



const searchResults = props.searchData.data.results;
// JSON.parse(localStorage.getItem('searchResults'));
console.log(searchResults);
const openModal = (id)=>{
  props.openModal('open')
  const clickedMovie =  searchResults.find(elem => elem.id === id);
  props.getClickedMovie(clickedMovie);
}

  return (
    <div>
    <h2>Search results for: {props.keyWord}</h2>

    <Pagination searchData={props.searchData} axiosSearch={()=>{props.axiosSearch()}} page={props.page} setPage={(page)=>{props.setPage(page)}} />

<span></span>
    {searchResults.map(movie =>(     
           <div key={movie.id} className='pop_movie_list_item' onClick = {()=>{openModal(movie.id)}}>
             <h3>{movie.title}</h3>
             <img src={imgBaseUrl + movie.poster_path} alt={movie.title} className='most_popular_img'/>
             <br />
             <span className='avg_rating'> Rate: {movie.vote_average} </span>
           </div>
           ))}

  </div>
  )
}
