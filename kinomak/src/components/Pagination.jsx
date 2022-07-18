import { useState } from "react";
import React from 'react'

export default function Pagination(props) {
const [reload, setReload] = useState('');
const page = props.page;
const searchData = props.searchData.data;
const totalPgs = searchData.total_pages;
const curPage = searchData.page;
const totalRes = searchData.total_results;
console.log(searchData);


const handleDecrement = ()=>{
    props.setPage(page - 1)
    props.axiosSearch();
    setReload('reload');
}

const handleIncrement = ()=>{
    props.setPage(page + 1)
    props.axiosSearch();
    setReload('reload');
}

  return (
    <div className='pagination'>
        <button onClick={()=>{handleDecrement()}} className="page_prev">prev</button>
        <div className='paginRes'>
        <span>total results: {totalRes}</span><br />
        <span>page #{curPage}</span><br />
        <span> out of...{totalPgs}</span>
        </div>
        <button onClick={()=>{handleIncrement()}} className="page_next">next</button>
    </div>
  )
}
