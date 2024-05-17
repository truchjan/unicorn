const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = reject
});

export async function handleImageUpload(files: any) {
  return await toBase64(files[0])
}