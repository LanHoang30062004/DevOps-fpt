import { useState } from "react";

import { usersApi } from "../api/users";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import { useUsers } from "../hooks/useUsers";

export default function UsersPage() {
  const { users, loading, error, setError, loadUsers } = useUsers();
  const [editingUser, setEditingUser] = useState(null);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter((user) =>
    [user.name, user.email].some((value) =>
      value.toLowerCase().includes(normalizedSearch),
    ),
  );
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  async function saveUser(user) {
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      if (editingUser) await usersApi.update(editingUser.id, user);
      else await usersApi.create(user);
      setEditingUser(null);
      await loadUsers();
      setSuccess(
        editingUser ? "Cập nhật user thành công." : "Tạo user thành công.",
      );
      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function deleteUser(user) {
    if (!window.confirm(`Xoá user ${user.name}?`)) return;
    setError("");
    setSuccess("");
    try {
      await usersApi.remove(user.id);
      await loadUsers();
      setSuccess("Xoá user thành công.");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Workspace / Directory</p>
          <h1>Users</h1>
          <p className="subtitle">Quản lý tài khoản trong hệ thống của bạn.</p>
        </div>
        <div className="count-badge">
          <span>{users.length}</span> users
        </div>
      </header>
      {error && (
        <div className="alert" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="success" role="status">
          {success}
        </div>
      )}
      <section className="content-grid">
        <UserForm
          key={editingUser?.id ?? "new-user"}
          editingUser={editingUser}
          onSubmit={saveUser}
          onCancel={() => setEditingUser(null)}
          busy={busy}
        />
        <section className="user-list-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Directory</p>
              <h2>Danh sách users</h2>
            </div>
            <button className="button button-quiet" onClick={loadUsers}>
              Làm mới
            </button>
          </div>
          <div className="list-controls">
            <label className="search-field">
              Tìm kiếm
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setPage(1);
                }}
                placeholder="Theo tên hoặc email"
              />
            </label>
            <label className="page-size-field">
              Số dòng
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </label>
          </div>
          <UserTable
            users={visibleUsers}
            loading={loading}
            onEdit={setEditingUser}
            onDelete={deleteUser}
            emptyMessage={
              normalizedSearch
                ? "Không tìm thấy user phù hợp."
                : "Chưa có user nào. Hãy tạo user đầu tiên."
            }
          />
          {totalPages > 1 && (
            <nav className="pagination" aria-label="Phân trang user">
              <button
                className="button button-quiet"
                disabled={currentPage === 1}
                onClick={() => setPage((current) => current - 1)}
              >
                Trước
              </button>
              <span>
                Trang {currentPage} / {totalPages}
              </span>
              <button
                className="button button-quiet"
                disabled={currentPage === totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                Sau
              </button>
            </nav>
          )}
        </section>
      </section>
    </main>
  );
}
