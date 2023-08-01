import { vi } from "vitest";
import { emitToastError, emitToastInfo, emitToastSuccess } from "./toast";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

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
