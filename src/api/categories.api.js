import api from "../services/api";

export async function fetchCategories() {
  const res = await api.get("/categories");
  // Backend returns ApiResponse structure: { status, data, message }
  return res.data.data;
}
