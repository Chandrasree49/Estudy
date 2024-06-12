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
      setMaterials((prevMaterials) =>
        prevMaterials.map((material) =>
          material._id === editingMaterial._id ? editingMaterial : material
        )
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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Tutor Materials</h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                <td className="px-6 py-4 whitespace-nowrap">
                  {material.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={material.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {material.link}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => openModal(material)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(material._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 1000,
          },
          content: {
            zIndex: 1001,
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "500px",
            padding: "20px",
          },
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Edit Material</h2>
        <input
          type="text"
          value={editingMaterial?.title || ""}
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
          value={editingMaterial?.link || ""}
          onChange={(e) =>
            setEditingMaterial({
              ...editingMaterial,
              link: e.target.value,
            })
          }
          className="my-2 p-2 block w-full border border-gray-300 rounded-md"
          placeholder="Link"
        />
        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ViewTutorMaterials;
