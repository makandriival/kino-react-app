
import './App.css';
import Home from './components/home/Home';
import Library from './components/library/Library';
import Search from './components/search/Search';
import SinglePage from './components/SinglePage';
import Loading from './components/Loading';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [popMovies, setPopMovies] = useState([]);
  const [activeNav, setActiveNav] = useState('home');
  const [singlePage, setSinglePage] = useState('closed');
  const [clickedMovie, setClickedMovie] = useState({});
  const [keyWord, setKeyWord] = useState('doctor');
  const [libNav, setLibNav] = useState('watched');
  const [watchedArr, setIdWatchedArr] = useState([])
  const [toWatchArr, setIdToWatchArr] = useState([]);
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState([]);

  const apiKey = '89fd381db9ad27b0433e7f45be441eda';
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${keyWord}&page=${page}`;
  const popMoviesUrl = 'https://api.themoviedb.org/3/trending/movie/week?api_key=89fd381db9ad27b0433e7f45be441eda';

  let watched = [];
  let idWatchedArr = [];
  let toWatch = [];
  let idToWatchArr = [];

  const handleWatched = ()=>{
    console.log('handleWatched');
    let getLocal = localStorage.getItem('listWatched');
    getLocal === null ? watched = [] : watched = JSON.parse(getLocal);
    watched.map((movie)=>{idWatchedArr.push(movie.id)});
    setIdWatchedArr(idWatchedArr);
    const pushData = ()=>{
      watched.push(clickedMovie);
    };
    !idWatchedArr.includes(clickedMovie.id) ? pushData() :  console.log('Already in Watched List!');
    localStorage.setItem('listWatched' , JSON.stringify(watched));
  };

  const handleToWatch = ()=>{
    let getLocal = localStorage.getItem('listToWatch');
    getLocal === null ? toWatch = [] : toWatch = JSON.parse(getLocal);
    // console.log(toWatch);
    toWatch.map((movie)=>{idToWatchArr.push(movie.id)});
    setIdToWatchArr(idToWatchArr);
    const pushData = ()=>{
      toWatch.push(clickedMovie);
    };
    !idToWatchArr.includes(clickedMovie.id) ? pushData() :  console.log('Already in To Watch List!');
    localStorage.setItem('listToWatch' , JSON.stringify(toWatch));
  };

  
  


  useEffect(()=>{
      axiosPopMovies();
      axiosSearch();
      setPage(1); 
    }, []);
      const axiosPopMovies = async()=>{
          const res = await axios.get(popMoviesUrl).then(data=>data.data.results);
          setPopMovies(res);
        
        };       
        const axiosSearch = async ()=>{
            // const search = await axios.get(searchUrl).then(data => data.data.results);
            const pageData = await axios.get(searchUrl).then(data => data);
            setSearchData(pageData);
            
            // localStorage.setItem('searchResults', JSON.stringify(search))
        };
        
  const handleInput = (key)=>{
    setKeyWord(key);
  }      

  const handleSearch = ()=>{
    axiosSearch(); 
    
    setActiveNav('search');
    
  }
  

  return (
    <div>
        <header>
            <h2>KinoMak</h2>
            <div className='search_conteiner' >
                <label className ={ activeNav === 'library' ? 'hidden' : 'search' }  htmlFor="search">
                    <input onChange={(evt)=>{handleInput(evt.target.value)}} type="text" />
                    <button onClick={()=>{handleSearch()}} >search</button>
                </label>
            </div>
            <nav>
                <button className={activeNav === 'home' ? 'active' : 'home_btn'} onClick={()=>{setActiveNav('home')}}>home</button>
                <button className={activeNav === 'library' ? 'active' : 'library_btn'} onClick={()=>{setActiveNav('library')}}>library</button>
            </nav>
        </header>
    

      { popMovies !== null ?
      (activeNav === 'home' ? <Home popMovies={popMovies} getClickedMovie={(clickedMovie)=>{setClickedMovie(clickedMovie)}} openModal={(singlePage)=>{setSinglePage(singlePage)}}/> 
      : activeNav === 'library' ? <Library libNav={libNav} setLibNav={(libNav)=>{setLibNav(libNav)}} openModal={(singlePage)=>{setSinglePage(singlePage)}} getClickedMovie={(clickedMovie)=>{setClickedMovie(clickedMovie)}} /> 
      : activeNav === 'search' ? <Search searchData={searchData} axiosSearch={()=>{axiosSearch()}} page={page} setPage={(page)=>{setPage(page)}} keyWord={keyWord} openModal={(singlePage)=>{setSinglePage(singlePage)}} getClickedMovie={(clickedMovie)=>{setClickedMovie(clickedMovie)}} />
      : alert('Rendering error!>'))
      : <Loading/>
      }

      {singlePage === 'open' ? <SinglePage toWatchArr={toWatchArr} watchedArr={watchedArr} handleToWatch={()=>{handleToWatch()}} handleWatched={()=>{handleWatched()}} closeSinglePage={(singlePage)=>{setSinglePage(singlePage)}}
       clickedMovieData={clickedMovie}/> : console.log('s p closed!')}

        
    </div>
  );
}

export default App;
