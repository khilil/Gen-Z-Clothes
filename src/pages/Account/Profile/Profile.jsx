import React from "react";
import "./Profile.css";

const Profile = () => {
  const profile = {
    fullName: "Vikram Sharma",
    email: "vikram.sharma@domain.com",
    mobile: "+91 98765 43210",
    password: "••••••••••••",
    dob: "12 October 1992",
    gender: "Male",
  };

  return (
    <section className="profile">
      {/* PAGE HEADER */}
      <header className="profile-header">
        <h1 className="profile-title">Profile Settings</h1>
        <p className="profile-subtitle">
          Manage your personal information and account security.
        </p>
      </header>

      {/* PERSONAL DETAILS */}
      <div className="profile-card">
        <h2 className="card-title">Personal Details</h2>

        <div className="profile-grid">
          <div className="profile-field">
            <span className="label">Full Name</span>
            <span className="value">{profile.fullName}</span>
          </div>

          <div className="profile-field">
            <span className="label">Email Address</span>
            <span className="value">{profile.email}</span>
          </div>

          <div className="profile-field">
            <span className="label">Mobile Number</span>
            <span className="value">{profile.mobile}</span>
          </div>

          <div className="profile-field">
            <span className="label">Account Password</span>
            <span className="value">{profile.password}</span>
          </div>

          <div className="profile-field">
            <span className="label">Date of Birth</span>
            <span className="value">{profile.dob}</span>
          </div>

          <div className="profile-field">
            <span className="label">Gender</span>
            <span className="value">{profile.gender}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="profile-actions">
          <button className="link-btn">
            <span className="material-symbols-outlined">edit</span>
            Edit Profile
          </button>

          <button className="link-btn">
            <span className="material-symbols-outlined">lock_reset</span>
            Update Password
          </button>

          <button className="link-btn danger">
            <span className="material-symbols-outlined">delete</span>
            Deactivate Account
          </button>
        </div>
      </div>

      {/* OPTIONS */}
      <div className="profile-options">
        <div className="option-card">
          <div className="option-head">
            <div className="option-icon">
              <span className="material-symbols-outlined">news</span>
            </div>
            <h3>Email Preferences</h3>
          </div>
          <p>
            Manage how you receive marketing updates and order notifications.
          </p>
          <a href="#">Configure</a>
        </div>

        <div className="option-card">
          <div className="option-head">
            <div className="option-icon">
              <span className="material-symbols-outlined">security</span>
            </div>
            <h3>Security Settings</h3>
          </div>
          <p>
            Manage two-factor authentication and active login sessions.
          </p>
          <a href="#">Manage</a>
        </div>
      </div>
    </section>
  );
};

export default Profile;
