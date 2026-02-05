import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const initialProfile = {
    fullName: "Vikram Sharma",
    email: "vikram.sharma@domain.com",
    mobile: "+91 98765 43210",
    password: "••••••••••••",
    dob: "1992-10-12",
    gender: "Male",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
  };

  return (
    <section className="profile-page">
      {/* HEADER */}
      <div className="profile-page-header">
        <h2 className="profile-page-title">Profile Settings</h2>
        <p className="profile-page-subtitle">
          {isEditing
            ? "Edit your personal details below."
            : "Manage your personal information and account security."}
        </p>
      </div>

      {/* CARD */}
      <div className="profile-card">
        <h3 className="profile-card-title">Personal Details</h3>

        {!isEditing ? (
          /* ================= VIEW MODE ================= */
          <>
            <div className="profile-grid">
              <ViewField label="Full Name" value={profile.fullName} />
              <ViewField label="Email Address" value={profile.email} />
              <ViewField label="Mobile Number" value={profile.mobile} />
              <ViewField label="Account Password" value={profile.password} />
              <ViewField
                label="Date of Birth"
                value={new Date(profile.dob).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
              <ViewField label="Gender" value={profile.gender} />
            </div>

            <div className="profile-actions profile-actions-view">
              <button
                className="profile-action-btn"
                onClick={() => setIsEditing(true)}
              >
                <span className="material-symbols-outlined">edit</span>
                Edit Profile
              </button>

              <button className="profile-action-btn">
                <span className="material-symbols-outlined">lock_reset</span>
                Update Password
              </button>

              <button className="profile-action-btn danger ml-auto">
                <span className="material-symbols-outlined">delete</span>
                Deactivate Account
              </button>
            </div>

          </>
        ) : (
          /* ================= EDIT MODE ================= */
          <form onSubmit={handleSave}>
            <div className="profile-grid">
              <EditField
                label="Full Name"
                name="fullName"
                value={draft.fullName}
                onChange={handleChange}
              />

              <EditField
                label="Email Address"
                value={draft.email}
                disabled
              />

              <EditField
                label="Mobile Number"
                name="mobile"
                value={draft.mobile}
                onChange={handleChange}
              />

              <EditField
                label="Account Password"
                value={draft.password}
                disabled
                type="password"
              />

              <EditField
                label="Date of Birth"
                type="date"
                name="dob"
                value={draft.dob}
                onChange={handleChange}
              />

              <div className="profile-field">
                <label>Gender</label>
                <select
                  name="gender"
                  value={draft.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">
                    Prefer not to say
                  </option>
                </select>
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="profile-save-btn">
                SAVE CHANGES
              </button>
              <button
                type="button"
                className="profile-cancel-btn"
                onClick={handleCancel}
              >
                CANCEL
              </button>
            </div>
          </form>
        )}
      </div>

      {/* OPTIONS */}
      {!isEditing && (
        <div className="profile-options">
          <div className="option-card">
            <div className="option-head">
              <div className="option-icon">
                <span className="material-symbols-outlined">news</span>
              </div>
              <h4>Email Preferences</h4>
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
              <h4>Security Settings</h4>
            </div>

            <p>
              Manage two-factor authentication and active login sessions.
            </p>
            <a href="#">Manage</a>
          </div>
        </div>

      )}
    </section>
  );
};

/* ================= HELPERS ================= */

const ViewField = ({ label, value }) => (
  <div className="profile-field view">
    <span className="field-label">{label}</span>
    <span className="field-value">{value}</span>
  </div>
);

const EditField = ({ label, ...props }) => (
  <div className="profile-field">
    <label>{label}</label>
    <input {...props} />
  </div>
);

export default Profile;
