import React, { FormEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams,Link } from 'react-router-dom'
import { AppDispatch } from '../app/store';
import { updateUser } from '../app/userDetailSlice';
import { useNavigate } from 'react-router-dom';

const Update = () => {

    const {id} = useParams();
    const allUsers = useSelector((state:any) => state.app.users);
    const [updateData, setUpdateData] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        const user = allUsers.filter((item:any) => item.id == id);
        setUpdateData(user[0]);
    },[])

    const newData = (e: any ) => {
        setUpdateData({...updateData, [e.target.name] : e.target.value}); 
    }
    const handleUpdate = (e:any) => {
        e.preventDefault();
        dispatch(updateUser(updateData));
        navigate("/read");
    }
    console.log(updateData) 

  return (
    <div>
    <form className="w-50 mx-auto mt-5" onSubmit={handleUpdate}>
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" name="name" value={updateData && updateData.name} onChange={newData} className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="text" name="email" value={updateData && updateData.email} onChange={newData} className="form-control" />
        </div>
        <div className="mb-3">
            <label className="form-label">Age</label>
            <input type="text" name="age" value={updateData && updateData.age} onChange={newData} className="form-control" />
        </div>
        <div className="mb-3">    
            <div className="form-check form-check-inline">
                <input className="form-check-input" checked={updateData && updateData.gender === "Male"} onChange={newData} type="radio" name="gender" value="Male" />
                <label className="form-check-label" >Male</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" checked={updateData && updateData.gender === "Female"} onChange={newData} type="radio" name="gender" value="Female" />
                <label className="form-check-label">Female</label>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/read"><button className="btn btn-secondary mx-3">Cancel</button></Link>
    </form>
</div>
  )
}

export default Update