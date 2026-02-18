import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const SavedContext = createContext({
  saved: [],
  isSaved: () => false,
  toggleSave: () => {},
});

export const SavedProvider = ({ children }) => {
  const [saved, setSaved] = useState(() => {
    try {
      const raw = localStorage.getItem("savedReels");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("savedReels", JSON.stringify(saved));
    } catch {
      // ignore write errors
    }
  }, [saved]);

  const isSaved = (id) => Array.isArray(saved) && saved.some((r) => r._id === id);

  const toggleSave = (item) => {
    setSaved((prev) => {
      const list = Array.isArray(prev) ? prev : [];
      const exists = list.some((r) => r._id === item._id);
      if (exists) return list.filter((r) => r._id !== item._id);
      const { _id, video, description, foodPartner } = item;
      return [{ _id, video, description, foodPartner }, ...list];
    });
  };

  const value = useMemo(() => ({ saved, isSaved, toggleSave }), [saved]);

  return (
    <SavedContext.Provider value={value}>{children}</SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
