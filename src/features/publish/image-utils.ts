function readAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Downscales an image to fit `max` px and re-encodes it as JPEG so it fits in
 * localStorage. Falls back to the original data URL if canvas is unavailable.
 */
export async function imageToDataUrl(file: File, max = 1280, quality = 0.75) {
  const original = await readAsDataUrl(file);
  try {
    const img = new Image();
    img.src = original;
    await img.decode();
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) return original;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  } catch {
    return original;
  }
}
