import React,{ useState,useEffect}from 'react'
import './Weather.css'

function Weather(){

    const[data,setdata] = useState({});
    const[search,setsearch] = useState("goa");
    const[input,setinput] = useState("");

    
    useEffect(()=>{
        const fetchWeather = async ()=>{
            const resolve = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${search}`,
            {method:"GET",
                headers:{   'X-RapidAPI-Key': '580d82b928msh60f071ba745c4ebp18b8e4jsnc525369a63b1',
                            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'}});
                
                            // console.log(resolve);
                                const result = await resolve.json();
                                console.log(result);
                
                setdata(result);
                //console.log(data.location.name)
            
            
           }

        fetchWeather();
    } , [search])

    //calling date and time
    let d= new Date();
    let date = d.getDate();
    let month=d.getMonth();
    let year = d.getFullYear();
    let time = d.toLocaleString([],{
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
    }
    );
    
    const handlesubmit=(e)=>{
        e.preventDefault();
        setsearch(input)
    }

    return(
     <>
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-4'>
                    <div className='card text-white text-center border-0'>
                        <img src="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg" className='card-img banner' alt='banner'/>
                        <div className="card-img-overlay">
                            <div className='card-text'>
                            <form onSubmit={handlesubmit}>
                            <div class="input-group mb-3 w-75 mx-auto">
                            <input type="text" class="form-control" placeholder="City Here!" aria-label="city" aria-describedby="button" name="search" value={input} onChange={(e)=>setinput(e.target.value)} required/>
                            <button class="btn btn-secondary" type="button" id="button" onClick={handlesubmit}>
                                <i className='fas fa-search'></i>
                            </button>
                            </div>
                            </form>

                            <div className='bg-dark bg-opacity-50 py-3'>
                            <p className="card-text lead">
                                {date}-{month+1}-{year}<br />
                                {time}
                            </p>
                            <hr/>
                            <img src={data.current?.condition?.icon} alt="loading.."/>
                            <div className='h1'>{data.current?.temp_c}&deg;C</div>

                            <p className=''><i>{data.current?.condition?.text}</i><br />
                            City : {data.location?.name}<br />
                            Country : {data.location?.country}<br />
                            Date&time : {data.location?.localtime}</p>
                            <p className="card-text"><small>Last updated few mins ago</small></p>
                            </div>
                            
                            </div>
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}

export default Weather;