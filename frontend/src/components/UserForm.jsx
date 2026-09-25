import { useState } from "react";

const emptyUser = { name: "", email: "" };

export default function UserForm({ editingUser, onSubmit, onCancel, busy }) {
  const [form, setForm] = useState(() =>
    editingUser
      ? { name: editingUser.name, email: editingUser.email }
      : emptyUser,
  );

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const submitted = await onSubmit(form);
    if (submitted !== false) setForm({ ...emptyUser });
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">
            {editingUser ? "Edit record" : "New record"}
          </p>
          <h2>{editingUser ? "Cập nhật user" : "Thêm user mới"}</h2>
        </div>
        {editingUser && (
          <button
            className="button button-quiet"
            type="button"
            onClick={onCancel}
          >
            Huỷ
          </button>
        )}
      </div>
      <label>
        Họ tên
        <input
          name="name"
          value={form.name}
          onChange={updateField}
          placeholder="Nguyễn Văn A"
          required
          maxLength={120}
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          placeholder="name@example.com"
          required
        />
      </label>
      <button className="button button-primary" type="submit" disabled={busy}>
        {busy ? "Đang lưu..." : editingUser ? "Lưu thay đổi" : "Tạo user"}
      </button>
    </form>
  );
}
