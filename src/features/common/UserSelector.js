export default function UserSelector({children, name, value, onChange, users}) {
  return (
  <>
    <label htmlFor={name}>{children}</label>
    <select name={name} id={name} value={value} onChange={onChange}>
      {users.map(user => (
        <option key={user.name} value={user.name}>{user.name}</option>
      ))}
    </select>
  </>
)}