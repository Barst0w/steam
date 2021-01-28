import React, { useEffect } from 'react';
import img1 from '../assets/img/avatars/1.png'
import img2 from '../assets/img/avatars/2.png'
import img3 from '../assets/img/avatars/3.png'
import img4 from '../assets/img/avatars/4.png'
import img5 from '../assets/img/avatars/5.png'
import img6 from '../assets/img/avatars/6.png'

function EditProfile(props) {

    useEffect(() => {
        props.updateProfileStates()
    }, [])

    return(
        <div className="editProfilePage">
            <div className="profileForm">
                <span className="formTitle">Edit Profile</span>
                <p>Country:</p>
                <input type="text" onChange={(e) => props.setCountry(e.target.value)} defaultValue={props.country}></input>
                <p>Description:</p>
                <input type="text" onChange={(e) => props.setDescription(e.target.value)} defaultValue={props.description}></input>
                <p>Choose an Avatar:</p>
                <div className="avatars">
                    <img src={img1} alt=""></img>
                    <img src={img2} alt=""></img>
                    <img src={img3} alt=""></img>
                    <img src={img4} alt=""></img>
                    <img src={img5} alt=""></img>
                    <img src={img6} alt=""></img>
                </div>
                <button className="saveChanges" onClick={props.updateProfile}>Save Changes</button>
            </div>
        </div>
    )
}

export default EditProfile;