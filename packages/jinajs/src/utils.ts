export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function urlToBase64(url: string) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "arraybuffer";
    xhr.open("GET", `${url}`);

    xhr.onload = function () {
      var base64, binary, bytes, mediaType;

      bytes = new Uint8Array(xhr.response);
      //NOTE String.fromCharCode.apply(String, ...
      //may cause "Maximum call stack size exceeded"
      binary = [].map
        .call(bytes, function (byte) {
          return String.fromCharCode(byte);
        })
        .join("");
      mediaType = xhr.getResponseHeader("content-type");
      base64 = [
        "data:",
        mediaType ? mediaType + ";" : "",
        "base64,",
        btoa(binary),
      ].join("");
      resolve(base64);
    };
    xhr.onerror = function (e) {
      console.log("xhr error:", e);
      reject(e);
    };
    xhr.send();
  });
}
