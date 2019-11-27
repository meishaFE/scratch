export function BlobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = e => {
      resolve(e.target.result);
    };

    fileReader.readAsDataURL(blob);
  });
}

export function Base64ToBlob(base64) {
  let arr = base64.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      reject(err);
    }
  });
}
