export const isPdfUrl = (url?: string): boolean => {
  if (!url) return false;
  try {
    const lower = url.toLowerCase();

    return /\.pdf(\?|#|$)/i.test(lower);
  } catch {
    return false;
  }
};

export const isImageUrl = (url?: string): boolean => {
  if (!url) return false;
  const lower = url.toLowerCase();

  return /\.(png|jpg|jpeg|gif|webp|bmp|svg)(\?|#|$)/i.test(lower);
};

export default { isPdfUrl, isImageUrl };
