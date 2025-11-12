import ReactDOM from "react-dom";
import { useEffect, useState, type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
};

const Modal = ({ isOpen, onClose, children, className = "", title }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[95dvh] h-auto bg-white flex flex-col rounded-lg w-full max-w-[100dvw] shadow-lg transition-all duration-200 ease-in-out p-[30px] overflow-hidden ${className}`}
      >
        {title && <p className="mb-2 text-2xl text-[#3f6ad8] font-bold">{title}</p>}
        <div className="overflow-y-auto overflow-x-hidden flex-1 rounded-b-lg">
          {children}
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;