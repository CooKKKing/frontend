import React, { useState } from 'react';
import { IoAdd } from "react-icons/io5";

const AddImageModal = ({ isOpen, onClose, onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onImageSelect(previewUrl);
      setSelectedImage(null);
      setPreviewUrl('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">이미지 추가</h2>
        
        <div className="mb-4">
          <div 
            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
            onClick={() => document.getElementById('imageInput').click()}
          >
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <>
                <IoAdd className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-gray-500">클릭하여 이미지 추가</p>
              </>
            )}
          </div>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedImage}
            className={`px-4 py-2 rounded-lg ${
              selectedImage
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddImageModal; 