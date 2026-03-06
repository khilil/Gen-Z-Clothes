import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../features/auth/authSlice";
import "./Profile.css";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const initialProfile = {
    fullName: user?.name || "Not Provided",
    email: user?.email || "Not Provided",
    mobile: user?.phone || "+91 XXXXX XXXXX",
    password: "••••••••••••",
    dob: "1998-05-24", // Placeholder
    gender: "Not Specified",
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
      {/* 🏛️ HEADER */}
      <div className="profile-page-header border-b border-black/[0.03] pb-10 mb-16">
        <h2 className="text-5xl font-impact tracking-tight mb-3 text-black">Identity Registry</h2>
        <p className="text-black/30 text-[10px] uppercase tracking-[0.4em] font-black">
          {isEditing
            ? "Modification in progress // Synchronizing personal parameters"
            : "Authorized access // Personal security protocols active"}
        </p>
      </div>

      {/* 📑 DATA CARD */}
      <div className="profile-card rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group/card">
        <div className="absolute top-0 right-0 p-5 opacity-10 uppercase text-[8px] font-black tracking-widest text-black">Registry Level 01</div>
        <h3 className="text-2xl font-impact tracking-tight text-black mb-12 uppercase">Principal Parameters</h3>

        {!isEditing ? (
          /* ================= VIEW MODE ================= */
          <>
            <div className="profile-grid grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              <ViewField label="Identity Index" value={profile.fullName} />
              <ViewField label="Communication Node" value={profile.email} />
              <ViewField label="Mobile Signal" value={profile.mobile} />
              <ViewField label="Access Protocol" value={profile.password} />
              <ViewField
                label="Existence Timestamp"
                value={new Date(profile.dob).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />
              <ViewField label="Genetic Trait" value={profile.gender} />
            </div>

            <div className="profile-actions-view mt-14 pt-10 border-t border-black/[0.03] flex flex-wrap gap-10">
              <button
                className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#8b7e6d] hover:text-black transition-all group/btn"
                onClick={() => setIsEditing(true)}
              >
                <span className="material-symbols-outlined text-xl group-hover/btn:rotate-12 transition-transform">edit_note</span>
                Modify Registry
              </button>

              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-black/30 hover:text-black transition-all group/btn">
                <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">shield_lock</span>
                Security Reset
              </button>

              <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-rose-500/60 hover:text-rose-600 transition-all group/btn ml-auto" onClick={handleLogout}>
                <span className="material-symbols-outlined text-xl group-hover/btn:translate-x-1 transition-transform">logout</span>
                Terminal Shutdown
              </button>
            </div>

          </>
        ) : (
          /* ================= EDIT MODE ================= */
          <form onSubmit={handleSave}>
            <div className="profile-grid">
              <EditField
                label="Identity Index"
                name="fullName"
                value={draft.fullName}
                onChange={handleChange}
              />

              <EditField
                label="Communication Node"
                value={draft.email}
                disabled
              />

              <EditField
                label="Mobile Signal"
                name="mobile"
                value={draft.mobile}
                onChange={handleChange}
              />

              <EditField
                label="Access Protocol"
                value={draft.password}
                disabled
                type="password"
              />

              <EditField
                label="Existence Timestamp"
                type="date"
                name="dob"
                value={draft.dob}
                onChange={handleChange}
              />

              <div className="profile-field">
                <label>Genetic Trait</label>
                <select
                  name="gender"
                  value={draft.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Redacted">Redacted</option>
                </select>
              </div>
            </div>

            <div className="profile-actions">
              <button type="submit" className="profile-save-btn">
                SYNCHRONIZE
              </button>
              <button
                type="button"
                className="profile-cancel-btn"
                onClick={handleCancel}
              >
                ABORT
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 🔐 OPTIONS */}
      {!isEditing && (
        <div className="profile-options">
          <div className="option-card">
            <div className="option-head">
              <div className="option-icon">
                <span className="material-symbols-outlined">alternate_email</span>
              </div>
              <h4>Signal Preferences</h4>
            </div>

            <p>
              Control incoming data regarding marketing synchronizations and transaction alerts.
            </p>
            <a href="#">Configure Signals</a>
          </div>

          <div className="option-card">
            <div className="option-head">
              <div className="option-icon">
                <span className="material-symbols-outlined">fingerprint</span>
              </div>
              <h4>Biometric Security</h4>
            </div>

            <p>
              Multi-factor authentication and management of active session traces across nodes.
            </p>
            <a href="#">Verify Identity</a>
          </div>
        </div>
      )}
    </section>
  );
};

/* ================= HELPERS ================= */

const ViewField = ({ label, value }) => (
  <div className="profile-field flex flex-col gap-3">
    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/20">{label}</span>
    <span className="text-xl font-impact tracking-tight text-black uppercase leading-none">{value}</span>
  </div>
);

const EditField = ({ label, ...props }) => (
  <div className="profile-field flex flex-col gap-4">
    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-[#8b7e6d]">{label}</label>
    <input {...props} className="bg-black/[0.02] border border-black/10 rounded-2xl px-8 py-5 text-black text-[12px] font-bold tracking-[0.1em] focus:border-[#8b7e6d] focus:bg-black/[0.04] transition-all outline-none" />
  </div>
);

export default Profile;
