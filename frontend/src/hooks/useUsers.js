import { useCallback, useEffect, useState } from "react";

import { usersApi } from "../api/users";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setUsers(await usersApi.list());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      setLoading(true);
      setError("");
      try {
        const loadedUsers = await usersApi.list();
        if (!cancelled) setUsers(loadedUsers);
      } catch (requestError) {
        if (!cancelled) setError(requestError.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  return { users, loading, error, setError, loadUsers };
}
