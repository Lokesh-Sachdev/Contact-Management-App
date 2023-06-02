const initialState = [{ id: 0, name: 'Test Name', email: 'test@test.com' }];

// Reducer function for managing contact state
export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      // Add a new contact to the state
      state = [...state, action.payload];
      return state;
    case 'DELETE_CONTACT':
      // Remove a contact from the state based on its ID
      const contactFilter = state.filter((contact) =>
        contact.id === action.payload ? null : contact
      );
      state = contactFilter;
      return state;
    case 'UPDATE_CONTACT':
      // Update an existing contact in the state based on its ID
      const contactUpdate = state.filter((contact) =>
        contact.id === action.payload.id
          ? Object.assign(contact, action.payload)
          : contact
      );
      state = contactUpdate;
      return state;
    case 'RESET_CONTACT':
      // Reset the contact state to initial value
      state = [{ name: null, email: null }];
      return state;
    default:
      return state;
  }
};
