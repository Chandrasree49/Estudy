import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const emails = localStorage.getItem("email");
  const [newNote, setNewNote] = useState({
    email: emails,
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/notes`, newNote);
      fetchNotes();
      setNotes([...notes, response.data]);
      const emails = localStorage.getItem("email");
      setNewNote({
        email: emails,
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="text"
            name="email"
            value={newNote.email}
            readOnly
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={newNote.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={newNote.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Note
        </button>
      </form>
      <h3>My Notes :</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note._id}>
              <td className="p-3">{note.title}</td>
              <td className="p-3">{note.description}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notes;
