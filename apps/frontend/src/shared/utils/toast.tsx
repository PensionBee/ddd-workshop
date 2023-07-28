import { SmallSystemIcon } from "@shared/components/Svg";
import type { ToastContent, UpdateOptions } from "react-toastify";
import { toast } from "react-toastify";

export const emitToastError = (content: ToastContent<unknown>) =>
  toast.error(content, {
    icon: <SmallSystemIcon fill="red100" icon="Alert" />,
  });
export const emitToastInfo = (content: ToastContent<unknown>) =>
  toast.info(content, {
    icon: <SmallSystemIcon fill="teal100" icon="AlertInfo" />,
  });
export const emitToastSuccess = (content: ToastContent<unknown>) =>
  toast.success(content, {
    icon: <SmallSystemIcon fill="green100" icon="CircleTick" />,
  });

export const emitToastPromise = (
  promise: Promise<unknown> | (() => Promise<unknown>),
  {
    pending,
    error,
    success,
  }: { pending: string; error: string; success: string }
) => {
  const id = toast.loading(pending);
  const successToast: UpdateOptions<unknown> = {
    render: success,
    type: "success",
    isLoading: false,
    autoClose: 3000,
  };
  const errorToast: UpdateOptions<unknown> = {
    render: error,
    type: "error",
    isLoading: false,
    autoClose: 3000,
  };
  Promise.resolve(promise)
    .then(() => toast.update(id, successToast))
    .catch(() => toast.update(id, errorToast));
};
