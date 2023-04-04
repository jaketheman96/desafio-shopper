import React from 'react';
import AddNewUserForm from '../components/AddNewUserForm';
import AdminTable from '../components/AdminTable';

function Admin() {
  return (
    <section>
      <AddNewUserForm />
      <AdminTable />
    </section>
  );
}

export default Admin;
