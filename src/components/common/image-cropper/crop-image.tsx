// export const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.addEventListener("load", () => resolve(image));
//     image.addEventListener("error", (error) => reject(error));
//     image.setAttribute("crossOrigin", "anonymous");
//     image.src = url;
//   });

// export default async function getCroppedImg(
//   imageSrc: string,
//   pixelCrop: { x: number; y: number; width: number; height: number }
// ): Promise<string | null> {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) {
//     return null;
//   }

//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;

//   const croppedCanvas = document.createElement("canvas");
//   const croppedCtx = croppedCanvas.getContext("2d");

//   if (!croppedCtx) {
//     return null;
//   }

//   croppedCanvas.width = pixelCrop.width;
//   croppedCanvas.height = pixelCrop.height;

//   croppedCtx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   );

//   return new Promise<string | null>((resolve, reject) => {
//     croppedCanvas.toBlob((file) => {
//       if (file) {
//         resolve(URL.createObjectURL(file));
//       } else {
//         reject("Error creating blob");
//       }
//     }, "image/jpeg");
//   });
// }

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // allow cross-origin image editing
    image.onload = () => resolve(image);
    image.onerror = (error) =>
      reject(new Error(`Failed to load image: ${error}`));
    image.src = url;
  });

interface CropParams {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CropOptions {
  type?: "image/jpeg" | "image/png" | "image/webp";
  quality?: number; // between 0 and 1
  returnType?: "blob" | "url"; // default is 'url'
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CropParams,
  options: CropOptions = {}
): Promise<string | Blob | null> {
  const { type = "image/jpeg", quality = 0.9, returnType = "url" } = options;

  try {
    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas context not available");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Error creating blob"));
            return;
          }

          if (returnType === "blob") {
            resolve(blob);
          } else {
            const objectUrl = URL.createObjectURL(blob);
            resolve(objectUrl);
          }
        },
        type,
        quality
      );
    });
  } catch (error) {
    console.log("Crop error:", error);
    return null;
  }
}
