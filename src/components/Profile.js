import React from 'react';

function Profile(props) {
    props.updateProfileStates()
    return(
        <div className="profilePage">
            <div className="profile">
                <div className="profileTop">
                    <div className="avatar"></div>
                    <p className="username">{localStorage.getItem('username')}</p>
                    <p className="country">{props.country}</p>
                    <p className="bio">{props.description}</p>
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