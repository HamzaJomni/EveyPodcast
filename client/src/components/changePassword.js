import React, { useState ,useEffect} from 'react';
import axios from 'axios';

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/users/user/profile', {
        withCredentials: true,
      })
      .then((result) => {
        if (result.data.success) {
          setProfile(result.data.user);
        } else {
          setError('Failed to get profile');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to get profile');
      });
  }, []);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:5000/users/motdepasseMAJ/${profile.id}`, {
      currentPassword,
      newPassword,
    }).then((response) => {
      alert(response.data);
      setCurrentPassword('');
      setNewPassword('');
    }).catch((error) => {
      console.error(error);
      alert('An error occurred while updating the password');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field">
        <label htmlFor="currentPassword">Current password:</label>
        <input type="password" id="currentPassword" value={currentPassword} onChange={handleCurrentPasswordChange} />
      </div>
      <div className="input-field">
        <label htmlFor="newPassword">New password:</label>
        <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}
export default ChangePasswordForm;
