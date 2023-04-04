import React, { useEffect, useState } from 'react';
import { handleAllFetchMethods } from '../utils/handleAllFetchMethods';

function AdminTable() {
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await handleAllFetchMethods('/user', 'GET', null, null);
      if (users.message) console.log(users.message);
      setAllUsers(users);
    };
    getAllUsers();
  }, []);
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
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button type="button" id={ user.id }>
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
