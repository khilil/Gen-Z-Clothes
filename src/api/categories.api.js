export async function fetchCategories() {
  const res = await fetch("https://api.escuelajs.co/api/v1/categories");
  return await res.json();
}
