import React, { useState } from 'react';
import '../lib/style/log.css';
import axios from "axios";
function ReportPopup(props) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Effectuer l'envoi de la requête de signalement avec la raison sélectionnée (selectedOption)
            axios.post('http://localhost:5000/report/report-podcast', { podcastId: props.podcastId.id, reason: selectedOption ,title:props.podcastId.title,author:props.podcastId.author})
                 .then(response => {
                  console.log(response);
                  })
                  .catch(error => {
                   console.log(error);
                  });

    // Fermer la fenêtre pop-up
    props.onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Report this podcast</h3>
        <form onSubmit={handleSubmit}>
          <label>
             Reason for reporting:
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="">-- Select an option --</option>
              <option value="Inappropriate content">Inappropriate content</option>
              <option value="Spam">Spam</option>
              <option value="Violation of copyright">Violation of copyright</option>
            </select>
          </label>
          <button type="submit">Send</button>
          <button   onClick={props.onClose}>Close</button>
        </form>
       
      </div>
    </div>
  );
}
export default ReportPopup;