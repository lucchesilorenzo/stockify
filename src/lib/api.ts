export async function uploadImage(formData: FormData) {
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    return error;
  }

  const data = await res.json();
  return data;
}
