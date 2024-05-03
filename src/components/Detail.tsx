import React from 'react';
import { useSelector } from 'react-redux';

interface  Props {
    id: any,
    showPopUp: any,
    setShowPopup: any
}
 const Detail = ({id, showPopUp, setShowPopup}:Props) => {

    const allUsers = useSelector((state:any) => state.app.users)
    const user = allUsers.filter((item:any) => item.id == id)
    
  return (
    <div>
        <div className="modalBackground">
            <div className="modalContainer text-center py-5">
                <h4>Name: {user[0].name}</h4>
                <h4>Email: {user[0].email}</h4>
                <h4>Age: {user[0].age}</h4>
                <h4>Gender: {user[0].gender}</h4>
                <button onClick={() => setShowPopup(false)} className="mt-5">Close</button>
            </div>
        </div>
    </div>
  )
}

export default Detail;