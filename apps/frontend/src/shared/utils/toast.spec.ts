import { emitToastError, emitToastInfo, emitToastSuccess } from "./toast";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

import { toast } from "react-toastify";

describe("emitToastError", () => {
  it("should emit error toast", () => {
    emitToastError("error");
    expect(toast.error).toHaveBeenCalledWith("error", expect.anything());
  });
});

describe("emitToastInfo", () => {
  it("should emit info toast", () => {
    emitToastInfo("info");
    expect(toast.info).toHaveBeenCalledWith("info", expect.anything());
  });
});

describe("emitToastSuccess", () => {
  it("should emit success toast", () => {
    emitToastSuccess("success");
    expect(toast.success).toHaveBeenCalledWith("success", expect.anything());
  });
});
