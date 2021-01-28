import React from 'react';
import img0 from '../assets/img/avatars/img.png'
import img1 from '../assets/img/avatars/1.png'
import img2 from '../assets/img/avatars/2.png'
import img3 from '../assets/img/avatars/3.png'
import img4 from '../assets/img/avatars/4.png'
import img5 from '../assets/img/avatars/5.png'
import img6 from '../assets/img/avatars/6.png'

function Profile(props) {
    props.updateProfileStates()

    let imagenull = img0;
    let image1 = img1;
    let image2 = img2;
    let image3 = img3;
    let image4 = img4;
    let image5 = img5;
    let image6 = img6;

    return(
        <div className="profilePage">
            <div className="profile">
                <div className="profileTop">
                    <img className="avatar" src={eval(`image${localStorage.getItem('avatarStorage')}`)} alt=""></img>
                    <p className="username">{localStorage.getItem('username')}</p>
                    <p className="country">{localStorage.getItem('countryStorage') === 'null' ? '' : localStorage.getItem('countryStorage')}</p>
                    <p className="bio">{localStorage.getItem('descriptionStorage') === 'null' ? '' : localStorage.getItem('descriptionStorage')}</p>
                    <p className="level">Level 10</p>
                    <button className="editProfileBtn"><a href="/EditProfile">Edit Profile</a></button>
                </div>
            <div className="profileSidebar">
                <ul>
                    <li className="online">Currently Online</li>
                    <li className="inventory">Inventory</li> 
                    <li className="screenshots">Screenshots</li>
                    <li className="friends">Friends</li>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Profile;