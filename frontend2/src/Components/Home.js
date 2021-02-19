import React,{useEffect,useState} from 'react'
import MediaCard from './MediaCard';
import data from '../data';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import {useSelector,useDispatch} from 'react-redux';
import  {listProduct,listProduct1} from '../Actions/productAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobsPagination from './JobsPagination';
function Home() {
const [page, setPage] = useState(1)
const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
const productList=useSelector(state=>state.productList);
const{products,loading,error,hasNextPage}=productList;
 const dispatch = useDispatch();
// console.log("data",products)

useEffect(() => {
    dispatch(listProduct(page,searchKeyword, sortOrder));
    return()=>{
        
    }
    
}, [page,searchKeyword,sortOrder])
const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProduct(page,searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProduct(page,searchKeyword, sortOrder));
  };

    return (<>
       <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
       { loading ? (
            <div style={{display:"flex",justifyContent:"center",alignContent:"center",height:"80vh",alignItems:"center"}}>
 <CircularProgress/>
            </div>
           
          ) : error ? (
            <div>{error}</div>
          ):
          <div>
        <Grid container spacing={2} style={{margin:16,width:"auto"}} >
            {products?
            products["results"]&&products["results"].map((product) => (
                <Grid item xs={12} sm={4} key={product._id}>
                    <MediaCard product={product} key={product._id} />
                </Grid>
            )):"Something Wrong with page"}
        </Grid>
        <JobsPagination page={page} setPage={setPage}  hasNextPage={hasNextPage} />
        </div>}
        </>
    )
    
}

export default Home
