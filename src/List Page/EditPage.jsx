import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { globalContext } from "../App";
import { useParams } from "react-router-dom";
import { updateUser } from "../Redux/App/Slice/Slice";
import "./EditPage.css";

function EditPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { update } = useContext(globalContext);
  const{id}=useParams()
  

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: ""
  });

  useEffect(() => {
    if (update) {
      setForm({
        first_name: update.first_name || "",
        last_name: update.last_name || "",
        email: update.email || "",
        avatar: update.avatar || ""
      });
    }
  }, [update]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedUser = { ...form, id:id};
    console.log(editedUser)
    dispatch(updateUser({ id, updates: editedUser }));
    alert("User updated!");
    navigate("/users");
  };

  const handleCancel = () => navigate("/users");

  return (
    <div className="edit-overlay">
      <div className="edit-box">
        <div className="edit-header">
          <h2>Edit User</h2>
          <button className="btn-close" onClick={handleCancel}>
            <Link to="/users">&times;</Link>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="edit-field">
            <label>First Name <span className="req">*</span></label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="edit-field">
            <label>Last Name <span className="req">*</span></label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="edit-field">
            <label>Email <span className="req">*</span></label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="edit-field">
            <label>Profile Image Link <span className="req">*</span></label>
            <input
              type="url"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              placeholder="Enter image URL"
              required
            />
          </div>

          <div className="edit-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              <Link to="/users">Cancel</Link>
            </button>
            <button type="submit" className="btn-submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPage;
