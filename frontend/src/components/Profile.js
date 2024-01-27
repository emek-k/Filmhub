import React from 'react';
import '../css/profile.css';
const Profile = ({ userInfo }) => {
  return (
    <div className="container">
      <div className="profile-container">
        <h1>Profile Page</h1>
        {userInfo && (
          <div>
            <p><strong>Username:</strong> {userInfo.Username}</p>
            <p><strong>Email:</strong> {userInfo.Email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
