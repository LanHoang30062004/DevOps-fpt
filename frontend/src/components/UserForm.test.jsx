import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import UserForm from "./UserForm";

describe("UserForm", () => {
  it("submits the entered user details", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(
      <UserForm
        editingUser={null}
        onSubmit={onSubmit}
        onCancel={vi.fn()}
        busy={false}
      />,
    );

    await user.type(screen.getByLabelText("Họ tên"), "Nguyen Van A");
    await user.type(screen.getByLabelText("Email"), "a@example.com");
    await user.click(screen.getByRole("button", { name: "Tạo user" }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Nguyen Van A",
      email: "a@example.com",
    });
    expect(screen.getByLabelText("Họ tên")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
  });
});
