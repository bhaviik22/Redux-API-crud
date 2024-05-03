import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../app/store';
import { deleteUser, readUser } from '../app/userDetailSlice';
import Detail from './Detail';
import { Link } from 'react-router-dom';


const Read = () => {

    const dispatch = useDispatch<AppDispatch>();
    const {users, loading, searchText}  = useSelector((state:any) => state.app);
    const [id, setId] = useState();
    const[userFilter, setUserFilter] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        dispatch(readUser());
    },[])

    if(loading){
        <h3>Loading...</h3>
    }
    if(!Array.isArray(users)){
        return <h2>No User Found</h2>
    }
  return (
    <div>
        <div className="mx-auto text-center my-2">    
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" checked={userFilter === ""} onChange={(e) => setUserFilter(e.target.value)}/>
                <label className="form-check-label">All</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" value="Male" checked={userFilter === "Male"} onChange={(e) => setUserFilter(e.target.value)} />
                <label className="form-check-label" >Male</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" value="Female" checked={userFilter === "Female"} onChange={(e) => setUserFilter(e.target.value)}/>
                <label className="form-check-label">Female</label>
            </div>
        </div>
        {showPopup && <Detail id={id} showPopUp={showPopup} setShowPopup={setShowPopup}/>}
        <div>
            {users && 
            users.filter((ele) => {
                if(searchText.length === 0){
                    return ele;
                }
                else{
                    return ele.name.toLowerCase().includes(searchText.toLowerCase())
                }
            })
            .filter((ele) => {
                if(userFilter === "Male"){
                    return ele.gender === "Male"
                }
                else if(userFilter === "Female"){
                    return ele.gender === "Female"
                }
                else{
                    return ele
                }
            })
            .map((item:any) => (
            <div className="card mx-auto my-4 text-center" key={item.id}style={{"width": "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title" >{item.name}</h5>
                    <h6 className="card-subtitle my-1">{item.email}</h6>
                    <p className="card-text"> {item.gender}</p>
                    <button onClick={() => [setId(item.id), setShowPopup(true)]} className="card-link">View</button>
                    <Link className="card-link" to={`/edit/${item.id}`}><button>Edit</button></Link>
                    <button className="card-link" onClick={() => dispatch(deleteUser(item.id))}>Delete</button>
                </div>
            </div>))}
        </div>
    </div>
  )
}

export default Read;