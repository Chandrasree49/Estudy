import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { BASE_URL } from "./apiEndPoints";

Modal.setAppElement("#root");

const ViewTutorMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}/materials`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials", error);
      }
    };
    fetchMaterials();
  }, []);

  const openModal = (material) => {
    setEditingMaterial(material);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMaterial(null);
  };

  const handleEdit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `${BASE_URL}/materials/${editingMaterial._id}`,
        {
          title: editingMaterial.title,
          link: editingMaterial.link,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      closeModal();
    } catch (error) {
      console.error("Error updating material", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(`${BASE_URL}/materials/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMaterials(materials.filter((material) => material._id !== id));
    } catch (error) {
      console.error("Error deleting material", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Materials</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Link
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {materials.map((material) => (
            <tr key={material._id}>
              <td className="px-6 py-4 whitespace-nowrap">{material.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <a
                  href={material.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {material.link}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => openModal(material)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(material._id)}
                  className="ml-2 text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Edit Material</h2>
        <input
          type="text"
          value={editingMaterial?.title}
          onChange={(e) =>
            setEditingMaterial({
              ...editingMaterial,
              title: e.target.value,
            })
          }
          className="my-2 p-2 block w-full border border-gray-300 rounded-md"
          placeholder="Title"
        />
        <input
          type="text"
          value={editingMaterial?.link}
          onChange={(e) =>
            setEditingMaterial({
              ...editingMaterial,
              link: e.target.value,
            })
          }
          className="my-2 p-2 block w-full border border-gray-300 rounded-md"
          placeholder="Link"
        />
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
        >
          Save
        </button>
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2 mt-4"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default ViewTutorMaterials;
