import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateContact = ({ contacts, updateContact }) => {
  const { id } = useParams();
  const history = useNavigate();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentContact.name);
    setEmail(currentContact.email);
  }, [currentContact]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!email || !name) {
      return toast.warning('Please fill in all fields!!');
    }
    if (checkContactEmailExists.length > 0) {
      return toast.error('This email already exists!!');
    }

    const data = {
      id: currentContact.id,
      email,
      name,
    };

    updateContact(data);
    toast.success('Contact updated successfully!!');
    history('/');
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history('/')}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={'Name'}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={'Email'}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button className="btn btn-primary">Update Contact</button>
                <button className="btn btn-danger" onClick={() => history('/')}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: 'UPDATE_CONTACT', payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateContact);
