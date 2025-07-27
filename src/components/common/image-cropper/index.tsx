import React, { useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./crop-image";
import { Slider } from "@/components/ui/slider";
import { Minus, Plus } from "lucide-react";

type area = { width: number; height: number; x: number; y: number };
type ImageCropperTypes = {
  image: string;
  setCroppedImage: React.Dispatch<any>;
  aspectRatio: number;
  FallbackUI?: React.JSX.Element | React.ReactNode;
  cropShape?: string | undefined | any;
  objectFit?:
    | "horizontal-cover"
    | "contain"
    | "cover"
    | "vertical-cover"
    | undefined;
};

const ImageCropper = ({
  image,
  setCroppedImage,
  aspectRatio,
  FallbackUI,
  cropShape = "rect",
  objectFit = "cover",
}: ImageCropperTypes) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  useEffect(() => {
    setCrop({ x: 0, y: 0 });

    setZoom(1);
  }, [image]);

  const onCropComplete = useCallback(
    async (croppedArea: area, croppedAreaPixels: area) => {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);

        if (croppedImage) setCroppedImage(croppedImage);
      } catch (e) {
        console.log("crop error", e);
      }
    },
    [image]
  );

  const handleToggleZoom = (
    type: string,
    value: number,
    max: number,
    min: number
  ) => {
    if (type === "INC") {
      setZoom((zoom) => (zoom + value > max ? max : zoom + value));
    } else if (type === "DEC") {
      setZoom((zoom) => (zoom - value <= min ? min : zoom - value));
    }
  };

  return (
    <>
      <div className="cropper_wrapper">
        {image ? (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape={cropShape}
            objectFit={objectFit}
          />
        ) : (
          <>{FallbackUI}</>
        )}
      </div>
      {image ? (
        <div className="image_cropper_slider">
          <button
            className="image_cropper_zoom_btn"
            onClick={() => handleToggleZoom("DEC", 0.5, 3, 1)}
          >
            <Minus />
          </button>
          <Slider
            min={1}
            max={3}
            step={0.1}
            value={[zoom]}
            onValueChange={(val: any) => setZoom(val[0])}
            className="w-full"
          />

          <button
            className="image_cropper_zoom_btn"
            onClick={() => handleToggleZoom("INC", 0.5, 3, 1)}
          >
            <Plus />
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ImageCropper;
