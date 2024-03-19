import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from './images/avatar15.jpg';
import { FaEdit, FaCheck } from "react-icons/fa";

const UserProfile = () => {
    const [avatar, setAvatar] = useState(Avatar)// Initialize avatar state
    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [currentPassword, setCurrentPassword] =useState('')
    const [newPassword, setNewPassowrd] =useState('')
    const [confirmnewPassword, setConfirmNewPassowrd] =useState('')

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0]); // Update avatar state with selected file
    };

    return (
        <section className="profile">
            <div className="container profile__container">
                <Link to={`/myposts/sdfsdf`} className='btn'>My posts</Link>
                <div className="profile__details">
                    <div className="avatar__wrapper">
                        <div className="profile__avatar">
                            <img src={avatar} alt="" />
                        </div>
                        {/* Form to update avatar */}
                        <form className="avatar__form">
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                onChange={handleAvatarChange} // Handle file change event
                                accept="image/png, image/jpeg" // Corrected MIME types
                            />
                            <label htmlFor="avatar"><FaEdit /></label>
                        </form>
                        <button className="profile__avatar-btn"><FaCheck /></button>
                    </div>
                    <h1> earnest achiver </h1>
                    <form className='form profile__form'>
                      <p className='form__error-message'>this is error</p>
                      <input type="text" placeholder='Full Name'value={name} onChange={e => setName(e.target.value)} />
                      <input type="email" placeholder='Email'value={email} onChange={e => setEmail(e.target.value)} />
                      <input type="password" placeholder='Current Password'value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                      <input type="password" placeholder='New password'value={newPassword} onChange={e => setNewPassowrd(e.target.value)} />
                      <input type="password" placeholder='Confirm New password'value={confirmnewPassword} onChange={e => setConfirmNewPassowrd(e.target.value)} />
                      <button type='submit'className='btn primary'> Update</button>
                   
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
