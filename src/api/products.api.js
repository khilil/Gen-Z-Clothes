export async function fetchProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products");
  return await res.json();
}
