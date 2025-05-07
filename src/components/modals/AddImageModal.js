// import React, { useState } from 'react';
// import { IoAdd } from "react-icons/io5";
// import Button from './Button';
// import { uploadImageToImageServer } from '../api/mutations/collectionService';

// const AddImageModal = ({ isOpen, onClose, onAdd, categoryId }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [title, setTitle] = useState('');
//   const [isUploading, setIsUploading] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // 파일 크기 체크 (5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         alert('파일 크기는 5MB를 초과할 수 없습니다.');
//         return;
//       }

//       // 파일 형식 체크
//       const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//       if (!validTypes.includes(file.type)) {
//         alert('지원하는 이미지 형식이 아닙니다. (JPEG, PNG, GIF, WEBP만 가능)');
//         return;
//       }

//       setSelectedImage(file);

//       // 미리보기 생성
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.onerror = () => {
//         alert('이미지 미리보기 생성에 실패했습니다.');
//         setSelectedImage(null);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!selectedImage || !title) {
//       alert('이미지와 제목을 모두 입력해주세요.');
//       return;
//     }

//     // 제목 길이 검증
//     if (title.trim().length < 2 || title.trim().length > 50) {
//       alert('제목은 2자 이상 50자 이하로 입력해주세요.');
//       return;
//     }

//     try {
//       setIsUploading(true);

//       // 이미지 서버에 업로드
//       const imageUrl = await uploadImageToImageServer(selectedImage);
      
//       // 이미지 URL 검증
//       if (!imageUrl || typeof imageUrl !== 'string') {
//         throw new Error('이미지 업로드에 실패했습니다.');
//       }

//       // Dictionary 컴포넌트에서 호출할 때
//       if (categoryId) {
//         try {
//           await onAdd(categoryId, {
//             menuName: title.trim(),
//             imageUrl: imageUrl
//           });
//         } catch (error) {
//           if (error.response?.status === 409) {
//             alert('이미 동일한 이름의 메뉴가 존재합니다. 다른 이름을 사용해주세요.');
//             return;
//           }
//           throw error;
//         }
//       }

//       // 초기화
//       setSelectedImage(null);
//       setPreviewUrl('');
//       setTitle('');
//       onClose();
//     } catch (error) {
//       console.error('이미지 업로드 실패:', error);
//       if (error.response?.status === 409) {
//         alert('이미 동일한 이름의 메뉴가 존재합니다. 다른 이름을 사용해주세요.');
//       } else {
//         alert(error.message || '이미지 업로드에 실패했습니다.');
//       }
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] flex flex-col">
//         <h2 className="text-xl font-bold mb-4">이미지 추가</h2>
        
//         <div className="flex-1 overflow-y-auto">
//           <div className="mb-4">
//             <div 
//               className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
//               onClick={() => document.getElementById('imageInput').click()}
//             >
//               {previewUrl ? (
//                 <img 
//                   src={previewUrl} 
//                   alt="Preview" 
//                   className="w-full h-full object-contain rounded-lg"
//                 />
//               ) : (
//                 <>
//                   <IoAdd className="w-8 h-8 text-gray-400 mb-2" />
//                   <p className="text-gray-500">클릭하여 이미지 추가</p>
//                 </>
//               )}
//             </div>
//             <input
//               id="imageInput"
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           </div>

//           {/* 제목 입력 필드 */}
//           {categoryId && (
//             <div className="mb-4">
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                 제목
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//                 placeholder="제목을 입력하세요"
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
//           <Button
//             variant="white"
//             size="md"
//             value="취소"
//             onClick={onClose}
//           />
            
//           <Button
//             variant="orange"
//             size="md"
//             value={isUploading ? "업로드 중..." : "추가"}
//             onClick={handleSubmit}
//             disabled={!selectedImage || !title || isUploading}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddImageModal; 
// 위에 도감 다시 연동 하면서 사용할 코드드

import React, { useState } from 'react';
import { IoAdd } from "react-icons/io5";
import Button from '../Button';

const AddImageModal = ({ isOpen, onClose, onAdd, categoryId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
      if (categoryId) {
        // Dictionary 컴포넌트에서 호출할 때
        onAdd(categoryId, { file: selectedImage, menuName: title });
      } else {
        // CreatePost 컴포넌트에서 호출할 때
        onAdd(previewUrl, { title, description });
      }
      setSelectedImage(null);
      setPreviewUrl('');
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4">이미지 추가</h2>
        
        <div className="flex-1 overflow-y-auto">
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

          {/* 제목 입력 필드 */}
          {categoryId && (
            <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              제목
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="제목을 입력하세요"
            />
          </div>
          )}
          

          {/* 설명 입력 필드 (Dictionary가 아닐 때만 표시) */}
          {/* {!categoryId && (
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                설명
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-24"
                placeholder="설명을 입력하세요"
              />
            </div>
          )} */}
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button
            variant="white"
            size="md"
            value="취소"
            onClick={onClose}
          />
            
         {
          categoryId 
          ? 
          <Button
            variant="orange"
            size="md"
            value="추가"
            onClick={handleSubmit}
            disabled={!selectedImage || !title}
          />
          : 
          <Button
            variant="orange"
            size="md"
            value="추가"
            onClick={handleSubmit}
            disabled={!selectedImage}
          />
         }
          
           
        </div>
      </div>
    </div>
  );
};

export default AddImageModal; 