import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import UserTable from "./UserTable";

const users = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "a@example.com",
    created_at: "2026-01-01T00:00:00Z",
  },
];

describe("UserTable", () => {
  it("renders a user and handles edit and delete actions", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <UserTable
        users={users}
        loading={false}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByText("Nguyen Van A")).toBeInTheDocument();
    expect(screen.getByText("a@example.com")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sửa" }));
    await user.click(screen.getByRole("button", { name: "Xoá" }));

    expect(onEdit).toHaveBeenCalledWith(users[0]);
    expect(onDelete).toHaveBeenCalledWith(users[0]);
  });
});
