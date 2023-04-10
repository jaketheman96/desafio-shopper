import React, { useEffect, useState } from 'react';
import handleAllFetchMethods from '../utils/handleAllFetchMethods';

function AdminTable() {
  const [allUsers, setAllUsers] = useState();
  const MINIMUM_NUMBERS = 3;

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await handleAllFetchMethods('/user', 'GET', null, null);
      if (users.message) console.log(users.message);
      setAllUsers(users);
    };
    getAllUsers();
  }, []);

  const handleRemoveUser = async ({ target }) => {
    await handleAllFetchMethods(`/user/${target.id}`, 'DELETE', null, null);
    const newArrayOfUsers = allUsers.filter((user) => user.id !== Number(target.id));
    setAllUsers(newArrayOfUsers);
  };
  return (
    <article>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {allUsers && allUsers.map((user, index) => (
            <tr key={ index }>
              <td>{String(user.id).padStart(MINIMUM_NUMBERS, '0')}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button type="button" id={ user.id } onClick={ handleRemoveUser }>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

export default AdminTable;
