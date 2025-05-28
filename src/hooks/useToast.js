import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import ToastMessage from "../components/ToastMessage";

// 전역에서 토스트를 사용할 수 있게 해주는 React Context
const ToastContext = createContext();

// 하위 컴포넌트에서 useToast()로 토스트를 띄울 수 있게 Context를 공급합니다.
// 반드시 앱의 루트(또는 필요한 영역)에서 ToastProvider로 감싸야 합니다.
export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);
      // 자동 사라짐(타이머) 및 애니메이션 제어용 ref
  const timerRef = useRef(null);
  const animationRef = useRef(null);
    // 토스트를 띄우는 함수
    // message: 표시할 텍스트
    // type: "success" | "error" 등 (디자인/색상 구분용)
    // 3초 뒤 자동으로 사라짐 (마지막 0.3초는 사라지는 애니메이션)
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setVisible(false); // 애니메이션 초기화
    // 다음 tick에 visible true로 만들어 애니메이션 트리거
    setTimeout(() => setVisible(true), 10);

    // 기존 타이머가 있으면 제거
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animationRef.current) clearTimeout(animationRef.current);

    // 2.7초 후 visible=false(사라지는 애니메이션 시작), 3초 후 토스트 제거
    timerRef.current = setTimeout(() => setVisible(false), 2700);
    animationRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

    // hideToast 함수
    // 사용자가 X 버튼 등으로 직접 토스트를 닫을 때 호출
    // 0.3초 애니메이션 후 토스트 제거
    const hideToast = useCallback(() => {
    setVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (animationRef.current) clearTimeout(animationRef.current);
    animationRef.current = setTimeout(() => setToast(null), 300); // 애니메이션 끝나고 제거
  }, []);
    // 컴포넌트 언마운트 시 타이머 정리 (메모리 누수 방지)
    useEffect(() => {
        return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (animationRef.current) clearTimeout(animationRef.current);
        };
    }, []);

    /**
   * 실제로 ToastContext.Provider로 children(앱 내용)을 감싸고,
   * 토스트가 있을 때만 ToastMessage를 absolute로 메인 컨텐츠 하단 중앙에 띄움
   * - transition-all, opacity, translate-y로 슬라이드업 애니메이션 적용
   */
    return (
        <ToastContext.Provider value={{ showToast }}>
        <div className="relative w-full h-full">
            {children}
            {toast && (
            <div className="absolute left-[50%] translate-x-[-50%] right-0 bottom-4 mx-auto flex justify-center z-50 pointer-events-none">
                <div
                className={`
                    transition-all duration-300 ease-out
                    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}
                `}
                style={{ width: "100%", minWidth: 0 }}
                >
                <ToastMessage
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
                </div>
            </div>
            )}
        </div>
        </ToastContext.Provider>
    );
    };
/**
 * useToast 훅
 * - ToastProvider 내부에서만 사용 가능3
 * 
 * - Provider 없이 사용 시 에러를 발생시켜 실수를 빠르게 잡아줌
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
