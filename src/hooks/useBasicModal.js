import { useState, useCallback } from "react";

/**
 * 모달 열림/닫힘 상태, 타입, 텍스트를 관리하는 커스텀 훅
 */
export default function useBasicModal() {
  const [open, setOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "",
    description: "",
    type: "success",
    confirmText: "확인",
  });

  // 모달 열기: 내용/타입 지정
  const openModal = useCallback((props) => {
    setModalProps({
      title: props.title || "",
      description: props.description || "",
      type: props.type || "success",
      confirmText: props.confirmText || "확인",
    });
    setOpen(true);
  }, []);

  // 모달 닫기
  const closeModal = useCallback(() => setOpen(false), []);

  return { open, openModal, closeModal, modalProps };
}
