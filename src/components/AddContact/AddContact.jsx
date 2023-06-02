import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../../styles';

const AddContact = ({ contacts, addContact }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email ? contact : null
    );

    // Check if the required fields are filled
    if (!email || !name) {
      return toast.warning('Please fill in all fields!!');
    }
    // Check if the email already exists in the contacts list
    if (checkContactEmailExists.length > 0) {
      return toast.error('This email already exists!!');
    }

    const data = {
      id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 0,
      email,
      name,
    };

    // Call the addContact action with the new contact data
    addContact(data);
    toast.success('Contact added successfully!!');
    history('/');
  };

  return (
    <div className="container-fluid">
      <h1 className={`${styles.subheading} text-center text-dark py-3 `}>
        Add Post
      </h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block btn-dark">Add Contact</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Connect the component to Redux store
const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  addContact: (data) => {
    // Dispatch the ADD_CONTACT action with the new contact data
    dispatch({ type: 'ADD_CONTACT', payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);
