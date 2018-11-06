export const photoToDataUrl = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', () => {
      reject(reader.error);
    });

    return file ? reader.readAsDataURL(file) : reject(new Error('USEAGE ERROR: Must provide a file'));
  });
};
