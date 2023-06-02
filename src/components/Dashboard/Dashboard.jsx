import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Dashboard = ({ contacts, deleteContact }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleViewContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseModal = () => {
    setSelectedContact(null);
  };

  return (
    <div className="container !max-w-none bg-[#E2F1FF]">
      <div className="row d-flex flex-column">
        <Link
          to="/add"
          className="btn btn-outline-dark my-5 mx-auto !max-w-[350px] !hover: !bg-[#EE564F]]"
        >
          Add Contact
        </Link>
        <div className="table-responsive col-md-12 col-lg-10 mx-auto my-4">
          <Modal show={selectedContact !== null} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Contact Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedContact && (
                <div>
                  <p>{`Name: ${selectedContact.name}`}</p>
                  <p>{`Email: ${selectedContact.email}`}</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
            </Modal.Footer>
          </Modal>
          <table className="table table-hover">
            <thead className="table-header text-center !font-normal bg-dark text-[#92ABE1]">
              <tr>
                <th className="font-normal" scope="col">
                  Id
                </th>
                <th className="font-normal" scope="col">
                  Name
                </th>
                <th className="font-normal" scope="col">
                  Email
                </th>
                <th className="font-normal" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, id) => (
                  <tr className="text-center" key={id}>
                    <td className="border-x-2">{id + 1}</td>
                    <td className="border-x-2">{contact.name}</td>
                    <td className="border-x-2">{contact.email}</td>
                    <td className="border-x-2 max-[425px]:flex flex-col gap-1">
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-sm btn-primary mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="btn btn-sm btn-info mr-1"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No contacts found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
