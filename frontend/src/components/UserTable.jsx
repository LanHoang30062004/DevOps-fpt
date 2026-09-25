export default function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
  emptyMessage,
}) {
  if (loading) return <div className="empty-state">Đang tải danh sách...</div>;
  if (!users.length)
    return (
      <div className="empty-state">
        {emptyMessage || "Chưa có user nào. Hãy tạo user đầu tiên."}
      </div>
    );

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Ngày tạo</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <strong>{user.name}</strong>
                <span className="user-id">#{user.id}</span>
              </td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleDateString("vi-VN")}</td>
              <td className="actions">
                <button className="text-button" onClick={() => onEdit(user)}>
                  Sửa
                </button>
                <button
                  className="text-button danger"
                  onClick={() => onDelete(user)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
