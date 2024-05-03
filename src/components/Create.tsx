import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import  { createUser }  from '../app/userDetailSlice';
import { AppDispatch } from '../app/store';
import { useNavigate } from 'react-router-dom';


export const Create = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        age: "",
        gender: ""
    });
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const getUserData = (e: any) => {
        const {name, value} = e.target;
        setUser((prevUserdata) => ({...prevUserdata, [name] : value}));
    }

    const handleSubmit = (e:any) =>{
        e.preventDefault();
        dispatch(createUser(user));
        navigate("/read");
    }

  return (
    <div>
        <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-control" onChange={getUserData}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text" name="email" className="form-control" onChange={getUserData}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Age</label>
                <input type="number" name="age" className="form-control" onChange={getUserData}/>
            </div>
            <div className="mb-3">    
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="Male" onChange={getUserData}/>
                    <label className="form-check-label" >Male</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="gender" value="Female" onChange={getUserData}/>
                    <label className="form-check-label">Female</label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}
export default Create;
