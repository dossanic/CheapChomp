import React from 'react';

function Profile() {
  return (
    <section>
      <h2>Profile</h2>

      {/* Placeholder profile details. Later this will connect to user data. */}
      <p>Name: User Name</p>
      <p>Email: user@email.com</p>
      <p>Location: Ontario</p>

      <button>Update Password</button>
      <button>Edit Info</button>
      <button>Logout</button>
    </section>
  );
}

export default Profile;