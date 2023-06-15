import React, { useEffect, useState } from 'react';
import axios from "axios";
import useDebounce from './Debounce';
import './style.css'
import ClipLoader from "react-spinners/ClipLoader";


function App() {
    const [search, setSearch] = useState('')
    const [noResult, setNoResult] = useState(false)
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(false);

    
    const debouncedSearchTerm = useDebounce(search, 1000); 
    const fetchData = async (searchTerm)=>{
        setLoading(true)
        const res = await axios.get(`https://jsonplaceholder.typicode.com/photos`)
        if(res.data.length === 0){
            setNoResult(true)
        }else{
            const filteredPhotos = res.data.filter(photo => photo.title.includes(searchTerm));
            setPhotos(filteredPhotos)
            setNoResult(filteredPhotos.length === 0)
        }
        setLoading(false)
    }

    useEffect(() => {
        if(debouncedSearchTerm){
            fetchData(debouncedSearchTerm)
        }else{
            setPhotos([])
            setNoResult(false)
        }
    }, [debouncedSearchTerm])



    return (

        <div className="wrapper">
            <input type='text' value={search} className='search' placeholder='Put text here'

                onChange={(e) => {
                    setSearch(e.target.value)
                }}

            />
            <div className='Loader'>
                {
                    loading ? <ClipLoader className="loader" loading={loading} size={100} /> : (
                        noResult? 
                        <div>No Results</div> :
                        photos.map((img) => {
                        return <img key={img.title} className='photo' src={img.url} />
                    
                    })

                )}


            </div>
        </div>
    )


}



export default App