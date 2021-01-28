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

    const imageClick = (e) => {
        console.log(e)
        let activeimages = document.getElementsByClassName('selectedImage')
        if (activeimages) {
            for (let i = 0; i < activeimages.length; ++i ) {
                activeimages[i].className = ''
            }
        }
        e.className = 'selectedImage';
        props.setimageid((e.attributes.datatype.value))
    }

    const editState = () => {
         props.setCountry(document.getElementsByClassName('countryInput')[0].value)
         props.setDescription(document.getElementsByClassName('descriptionInput')[0].value)
         props.updateProfile()
    }

    return(
        <div className="editProfilePage">
            <div className="profileForm">
                <span className="formTitle">Edit Profile</span>
                <p>Country:</p>
                <input className="countryInput" type="text" onChange={(e) => props.setCountry(e.target.value)} defaultValue={localStorage.getItem('countryStorage')}></input>
                <p>Description:</p>
                <input className="descriptionInput" type="text" onChange={(e) => props.setDescription(e.target.value)} defaultValue={localStorage.getItem('descriptionStorage')}></input>
                <p>Choose an Avatar:</p>
                <div className="avatars">
                    <img src={img1} alt="" onClick={(e) => imageClick(e.target)} datatype={1}></img>
                    <img src={img2} alt="" onClick={(e) => imageClick(e.target)} datatype={2}></img>
                    <img src={img3} alt="" onClick={(e) => imageClick(e.target)} datatype={3}></img>
                    <img src={img4} alt="" onClick={(e) => imageClick(e.target)} datatype={4}></img>
                    <img src={img5} alt="" onClick={(e) => imageClick(e.target)} datatype={5}></img>
                    <img src={img6} alt="" onClick={(e) => imageClick(e.target)} datatype={6}></img>
                </div>
                <button className="saveChanges" onClick={editState}>Save Changes</button>
            </div>
        </div>
    )
}

export default EditProfile;