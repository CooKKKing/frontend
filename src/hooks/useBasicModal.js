import { useState, useCallback } from "react";

/**
 * BasicModal, LoginModal 등 여러 모달을 관리하는 커스텀 훅
 */
export default function useBasicModal() {
  const [open, setOpen] = useState(false);
  // const [modalType, setModalType] = useState(null); // "basic" | "login" | null
  const [modalProps, setModalProps] = useState({
    title: "",
    description: "",
    type: "success",
    confirmText: "확인",
    SuccessButton: null,
    FailButton: null,
    OrangeButton: null,
    GreenButton: null,
    onConfirm: null,
    onFail: null,
  });

  // 모달 열기
  // const openModal = useCallback((props = {}) => {
  //   setModalType(props.type || "basic");
  //   if (props.type === "login") {
  //     // 로그인 모달은 별도 props 불필요
  //     setModalProps({});
  //   } else {
  //     setModalProps({
  //       title: props.title || "",
  //       description: props.description || "",
  //       type: props.type || "success",
  //       confirmText: props.confirmText || "확인",
  //     });
  //   }
  //   setOpen(true);
  // }, []);

  //type 이 무슨 소용인가 하는 생각이 들었음 애초에 basicModal 훅을 위해 만든게 아닌가 하는 생각에 코드를 바꿔봄 이게 문제 없이 돌아간다면 전체 코드 수정 예정

  const openModal = useCallback((props = {}) => {
    setModalProps({
      title: props.title || "",
      description: props.description || "",
      type: props.type || "success",
      confirmText: props.confirmText || "확인",
      SuccessButton: props.SuccessButton || null,
      FailButton: props.FailButton || null,
      OrangeButton: props.OrangeButton || null,
      GreenButton: props.GreenButton || null,
      onConfirm: props.onConfirm,
      onFail: props.onFail || null,
    });
    setOpen(true);
  }, []);

  // 모달 닫기
  const closeModal = useCallback(() => {
    setOpen(false);
    // setModalType(null);
  }, []);

  // return { open, openModal, closeModal, modalType, modalProps };
  return { open, openModal, closeModal, modalProps };
}
