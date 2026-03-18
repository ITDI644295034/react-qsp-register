import { OPEN_DATE, CLOSE_DATE } from "../constants/config";

export type CountdownStatus = "before" | "open" | "closed";

export interface CountdownState {
  status: CountdownStatus;
  distance: number;
}

export function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function getCountdownState(): CountdownState {
  const now = Date.now();
  if (now < OPEN_DATE) {
    return { status: "before", distance: OPEN_DATE - now };
  } else if (now <= CLOSE_DATE) {
    return { status: "open", distance: CLOSE_DATE - now };
  }
  return { status: "closed", distance: 0 };
}

export function compressImage(
  file: File,
  maxWidth: number,
  quality: number,
): Promise<string | null> {
  return new Promise((resolve) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxWidth) {
          h *= maxWidth / w;
          w = maxWidth;
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
    };
  });
}
