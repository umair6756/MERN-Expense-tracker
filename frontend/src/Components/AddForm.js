



import React, { useContext, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiContext } from "./apiContext";

const AddForm = ({ type, button }) => {

  const {showToast} = useContext(apiContext)


  const [isOpen, setIsOpen] = useState(true);
  const [chosenEmoji, setChosenEmoji] = useState("💻");
  const [showPicker, setShowPicker] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    icon: ''
  });

  const handleEmojiClick = (emojiObject, e) => {
    e.preventDefault();
    e.stopPropagation();
    setChosenEmoji(emojiObject.emoji);
    setShowPicker(false);
    setFormData((prevData) => ({
      ...prevData,
      icon: emojiObject.emoji,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      showToast('No token found, please log in!', "error");
      return;
    }

    // Dynamic API route based on type (Income or Expense)
    const apiRoute = type === "Income" ? "/income" : "/expense";

    try {
      const response = await fetch(`http://localhost:5000${apiRoute}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        showToast('Session expired. Please log in again!', "error");
        navigate('/');
      } else {
        const data = await response.json();
        if (response.ok) {
          showToast(`${type} added successfully!`, "success");
        } else {
          showToast(data.msg || `Failed to add ${type}.`, "error");
        }
      }
    } catch (err) {
      console.error('Error:', err);
      showToast('An error occurred. Please try again.', "error");
    }
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit}>
        <div className="modal-container">
          <div className="model-heading d-flex flex-row my-0 py-0" style={{ borderBottom: '1px solid red' }}>
            <button onClick={button} className="close-button">
              <X className="icon" />
            </button>
            <h5 className="modal-title my-3 py-0">Add {type}</h5>
          </div>
          <div className="model-form">
            <div className="emoji-section">
              <button type="button" onClick={() => setShowPicker(!showPicker)} className="emoji-button">
                {chosenEmoji || "Select an Emoji"}
              </button>
              <span className="emoji-label">Change Icon</span>
            </div>

            {showPicker && (
              <div className="emoji-picker-container">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">{type} Source</label>
              <input
                onChange={handleChange}
                name="category"
                value={formData.category}
                type="text"
                placeholder={type === "Income" ? "Freelance, Salary, etc" : "Food, Rent, Bills"}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Amount</label>
              <input
                onChange={handleChange}
                name="amount"
                value={formData.amount}
                type="number"
                placeholder="Enter amount"
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">Add {type}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
