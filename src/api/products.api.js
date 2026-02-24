import api from "../services/api";

export async function fetchProducts(categorySlug) {
  const url = categorySlug ? `/products?category=${categorySlug}` : "/products";
  const res = await api.get(url);
  // Backend returns ApiResponse structure: { status, data, message }
  return res.data.data;
}
