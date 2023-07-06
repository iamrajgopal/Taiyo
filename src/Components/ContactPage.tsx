import React, { useState } from "react"
import {HomeIcon} from '@heroicons/react/24/solid';
import {Link} from 'react-router-dom'

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [editContactId, setEditContactId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editContactId !== null) {
      // Handle edit mode
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === editContactId ? { ...contact, ...formData } : contact
        )
      );
      setEditContactId(null);
    } else {
      // Handle add mode
      const newContact: Contact = {
        id: Date.now(),
        ...formData,
      };
      setContacts((prevContacts) => [...prevContacts, newContact]);
    }
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });
  };

  const handleEdit = (id: number) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      setEditContactId(contactToEdit.id);
      setFormData({
        firstName: contactToEdit.firstName,
        lastName: contactToEdit.lastName,
        phoneNumber: contactToEdit.phoneNumber,
      });
    }
  };

  const handleDelete = (id: number) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  return (<>
  
  <nav className="bg-blue-500 h-16 flex justify-center items-center ">
  <Link to='/'><HomeIcon className="w-10 h-10 text-red-500" /></Link>
  </nav>
    <div className="container mx-auto px-4 flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mt-8 text-center" >Contact Page</h1>
      <form className="inline-block border border-blue-500 p-10" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="firstName">
            First Name:
          </label>
          <input
            className="border rounded px-3 py-2 w-50"
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="lastName">
            Last Name:
          </label>
          <input
            className="border rounded px-3 py-2 w-50"
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2" htmlFor="phoneNumber">
            Phone Number:
          </label>
          <input
            className="border rounded px-3 py-2 w-50"
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded" type="submit">
          {editContactId !== null ? "Update Contact" : "Add Contact"}
        </button>
      </form>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="border rounded p-4">
            <div>
              <strong>First Name:</strong> {contact.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {contact.lastName}
            </div>
            <div>
              <strong>Phone Number:</strong> {contact.phoneNumber}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded mr-2"
                onClick={() => handleEdit(contact.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default ContactPage;

