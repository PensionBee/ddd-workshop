import { StyledToastContainer } from "./ToastProvider.styled";

export const ToastProvider: React.FC = () => {
  return (
    <StyledToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};
