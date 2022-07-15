import React from 'react'
import './home.css'
// import {useEffect } from 'react'
// import axios from 'axios';

function Home(props) {

// get top 20 of the week =========================

  const imgBaseUrl = 'http://image.tmdb.org/t/p/w500';
    
    const popMovies = props.popMovies;
    

    // get clicked movie info ==================================
    const openModal = (id)=>{
      props.openModal('open') 
      const clickedMovie =  popMovies.find(elem => elem.id === id);
      props.getClickedMovie(clickedMovie);
    }

    // // pagination ==========================================
    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(10)

    // const lastPostIdx = currentPage * itemsPerPage;
    // const firstPostIdx = lastPostIdx - itemsPerPage;
    // const curentPageMovies = popMovies.slice(firstPostIdx, lastPostIdx);

  return (
    <div id = 'most_popular'>
      <h1>Top 20 Of The Week!</h1>
        <div className="popMovie">

         {popMovies.map(movie =>(
           
           <div key={movie.id} className='pop_movie_list_item' onClick = {()=>{openModal(movie.id)}}>
             <h3>{movie.title}</h3>
             <img src={imgBaseUrl + movie.poster_path} alt={movie.title} className='most_popular_img'/>
             <br />
             <span className='avg_rating'> Rate: {movie.vote_average} </span>
           </div>
           ))}
        </div>
        
      

    </div>
  )
}

export default Home