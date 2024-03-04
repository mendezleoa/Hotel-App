import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3 className="font-bold">{currentUser.username} Profile</h3>
      </header>
      <p className="font-bold">Id: {currentUser.id}</p>
      <p className="font-bold">Email: {currentUser.email}</p>
      Authorities:
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
