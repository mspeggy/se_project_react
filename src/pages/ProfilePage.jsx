const ProfilePage = ({ currentUser }) => {
  return (
    <div>
      <h2>Profile</h2>
      <img src={currentUser.avatar} alt="avatar" width="80" />
      <p>{currentUser.name}</p>
      <p>{currentUser.email}</p>
    </div>
  );
};

export default ProfilePage;