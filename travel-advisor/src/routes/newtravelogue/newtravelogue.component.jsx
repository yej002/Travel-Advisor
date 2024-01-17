import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./style.newtravelogue.css";

function NewTravelogue() {
  const [travelogue, setTravelogue] = useState({
    title: "",
    author: "",
    location: "",
    description: "",
    images: [],
  });
  const navigate = useNavigate();

  // This method will update the state properties.
  function updateForm(value) {
    return setTravelogue((prev) => {
      return { ...prev, ...value };
    });
  }

  // Load images from device
  const handleImageChange = (e) => {
    updateForm({ images: e.target.files });
  };

  // Validate if the required fields are filled
  const isValidForm = () => {
    if (!travelogue.title || !travelogue.location || !travelogue.description || travelogue.images.length === 0) {
      alert("Please fill in all required fields and add at least one image.");
      return false;
    }
    return true;
  };

  // This function will handle the submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidForm()) {
      return; // Stop the submission if the form is not valid
    }

    if (travelogue.images.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    const formData = new FormData();
    for (const key in travelogue) {
      if (key === "images") {
        for (const file of travelogue.images) {
          formData.append("images", file);
        }
      } else {
        formData.append(key, travelogue[key] || "Anonymous");
      }
    }

    try {
      const response = await axios.post("https://traveladvisor-407701.wl.r.appspot.com/travelogue/newtravelogue", formData);
      console.log(response.data);
      navigate("/travelogues");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div>
      <h3 className="text-center tittle_head">New Travelogue</h3>
      <form onSubmit={handleSubmit} className={styles.NewTravelogue_form}>
        <div className="contact-form">
          <label htmlFor="title" className={styles.NewTravelogue_label}>
            Title <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${styles.NewTravelogue_input}`}
            id="title"
            required
            value={travelogue.title}
            onChange={(e) => updateForm({ title: e.target.value })}
            placeholder="Enter title"
          />
        </div><br></br>
        <div className="contact-form">
          <label htmlFor="author">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={travelogue.author}
            onChange={(e) => updateForm({ author: e.target.value })}
            placeholder="Enter your name (Optional)"
          />
        </div><br></br>
        <div className="contact-form">
          <label htmlFor="location">Location <span className="required-asterisk">*</span> </label>
          <input
            type="text"
            className="form-control"
            id="location"
            required
            value={travelogue.location}
            onChange={(e) => updateForm({ location: e.target.value })}
            placeholder="Enter the city's name"
          />
        </div><br></br>
        <div className="contact-form">
          <label htmlFor="description">Description <span className="required-asterisk">*</span> </label>
          <textarea
            className="form-control"
            id="description"
            required
            rows={5}
            value={travelogue.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            placeholder="Enter description"
          />
        </div><br></br>
        <div className="contact-form">
          <label htmlFor="images">Images <span className="required-asterisk">*</span> </label>
          <input
            type="file"
            className="form-control"
            id="images"
            accept="image/*"
            multiple
            required
            onChange={handleImageChange}
          />
        </div><br></br>
        <div className="contact-form">
          <button type="submit" className={`btn btn-primary ${styles.NewTravelogue_button}`}>Create Travelogue</button>
        </div>
      </form>
    </div>
  );
}

export default NewTravelogue;
