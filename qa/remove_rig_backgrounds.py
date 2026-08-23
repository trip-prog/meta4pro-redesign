from pathlib import Path

import cv2
import numpy as np


ROOT = Path(r"E:\фриланс\сайты\META4PRO — основа v3")
SOURCE = ROOT / "source-assets" / "rig-v4"
OUTPUT = ROOT / "source-assets" / "rig-v4-fixed"
OUTPUT.mkdir(parents=True, exist_ok=True)


def isolate(path: Path, destination: Path) -> None:
    image = cv2.imdecode(np.fromfile(str(path), dtype=np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        raise RuntimeError(f"Unable to read {path}")

    height, width = image.shape[:2]
    blue, green, red = cv2.split(image)
    magenta = (
        (red > 105)
        & (blue > 105)
        & (green < 185)
        & (((red.astype(np.int16) + blue.astype(np.int16)) // 2 - green.astype(np.int16)) > 38)
    )

    mask = np.full((height, width), cv2.GC_PR_FGD, dtype=np.uint8)
    mask[magenta] = cv2.GC_BGD
    border = max(5, round(min(width, height) * 0.012))
    mask[:border, :] = cv2.GC_BGD
    mask[-border:, :] = cv2.GC_BGD
    mask[:, :border] = cv2.GC_BGD
    mask[:, -border:] = cv2.GC_BGD

    background_model = np.zeros((1, 65), np.float64)
    foreground_model = np.zeros((1, 65), np.float64)
    cv2.grabCut(image, mask, None, background_model, foreground_model, 7, cv2.GC_INIT_WITH_MASK)

    alpha = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(alpha, connectivity=8)
    cleaned = np.zeros_like(alpha)
    min_area = max(60, int(width * height * 0.00012))
    for label in range(1, count):
        x, y, component_width, component_height, area = stats[label]
        touches_edge = x <= 1 or y <= 1 or x + component_width >= width - 1 or y + component_height >= height - 1
        if area >= min_area and not touches_edge:
            cleaned[labels == label] = 255

    kernel = np.ones((3, 3), np.uint8)
    cleaned = cv2.morphologyEx(cleaned, cv2.MORPH_CLOSE, kernel)
    cleaned = cv2.GaussianBlur(cleaned, (3, 3), 0.55)
    rgba = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = cleaned
    success, encoded = cv2.imencode('.png', rgba)
    if not success:
        raise RuntimeError(f"Unable to write {destination}")
    encoded.tofile(str(destination))


for source_path in sorted(SOURCE.glob("*.png")):
    isolate(source_path, OUTPUT / source_path.name)
    print(source_path.name)
