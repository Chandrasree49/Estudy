import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">All Notes</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Email</th>
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note._id}>
              <td className="p-3">{note.email}</td>
              <td className="p-3">{note.title}</td>
              <td className="p-3">{note.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllNotes;
