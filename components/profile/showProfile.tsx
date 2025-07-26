interface ShowProfileProps {
  user: User;
  sameUser: boolean;
}

const UserProfile = ({ user, sameUser }: ShowProfileProps) => {
  return (
    <div className="profile-container">
      <div className="avatar">
        <img src={user.avatar || user.ai_avatar} alt="Profile Avatar" />
      </div>
      <div className="user-details">
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>Country: {user.country}</p>
        <p>Summary: {user.summary}</p>
        {sameUser && <a href="/profile">Edit Profile</a>}
      </div>
    </div>
  );
};

export default UserProfile;
