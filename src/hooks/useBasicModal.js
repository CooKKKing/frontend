import { useState, useCallback } from "react";

/**
 * BasicModal, LoginModal 등 여러 모달을 관리하는 커스텀 훅
 */
export default function useBasicModal() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "basic" | "login" | null
  const [modalProps, setModalProps] = useState({
    title: "",
    description: "",
    type: "success",
    confirmText: "확인",
  });

  // 모달 열기
  const openModal = useCallback((props = {}) => {
    setModalType(props.type || "basic");
    if (props.type === "login") {
      // 로그인 모달은 별도 props 불필요
      setModalProps({});
    } else {
      setModalProps({
        title: props.title || "",
        description: props.description || "",
        type: props.type || "success",
        confirmText: props.confirmText || "확인",
      });
    }
    setOpen(true);
  }, []);

  // 모달 닫기
  const closeModal = useCallback(() => {
    setOpen(false);
    setModalType(null);
  }, []);

  return { open, openModal, closeModal, modalType, modalProps };
}
