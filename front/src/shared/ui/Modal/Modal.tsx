import ReactDOM from "react-dom";
import { type ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

const Modal = ({  children, }: ModalProps) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
      <div>
          {children}
     </div>
     ,
    modalRoot
  );
};

export default Modal;