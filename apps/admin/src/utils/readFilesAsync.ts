export const readFileAsync = (file: File) =>
  new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer.'));
      }
    };

    reader.onerror = reject;

    const blob = new Blob([file]);
    reader.readAsArrayBuffer(blob);
  });
