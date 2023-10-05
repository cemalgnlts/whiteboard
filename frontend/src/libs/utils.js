import {
  Box2d,
  compact,
  AssetRecordType,
  getHashForString,
  isGifAnimated,
  uniqueId,
  MediaHelpers
} from "@tldraw/tldraw";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
const UPLOAD_URL = "/api/assets";

export function groupByCount(arr, size = 1) {
  if (arr.length < size) return [arr];

  return arr.reduce((acc, cur, idx) => {
    if (idx % size === 0) acc.push([cur]);
    else acc[acc.length - 1].push(cur);

    return acc;
  }, []);
}

export function duplicateShapes(editor) {
  const ids = editor.selectedShapeIds;
  const commonBounds = Box2d.Common(
    compact(ids.map((id) => editor.getShapePageBounds(id)))
  );
  const offset = editor.instanceState.canMoveCamera
    ? {
        x: commonBounds.width + 10,
        y: 0
      }
    : {
        x: 16 / editor.zoomLevel,
        y: 16 / editor.zoomLevel
      };

  editor.mark("duplicate shapes");
  editor.duplicateShapes(ids, offset);
}

export function isStoreUpdateEmpty(res) {
  const { added, removed, updated } = res.changes;

  for (const _ in added) return false;
  for (const _ in removed) return false;

  const keys = Object.keys(updated);

  if (keys.length > 1) return false;
  if (keys[0] !== "pointer:pointer") return false;

  return true;
}

export async function uploadAsset(projectId, file) {
  const id = uniqueId();

  const objectName = `${id}-${file.name}`.replaceAll(/[^a-zA-Z0-9.]/g, "-");
  const url = `${UPLOAD_URL}/${projectId}/${objectName}`;

  const formData = new FormData();
  formData.set("file", file);

  const req = await fetch(url, {
    method: "PUT",
    body: formData
  });

  if (!req.ok) throw Error(`${req.status}:${req.statusText}`);

  const res = await req.json();

  if (!res.status) throw res.message;

  const assetId = AssetRecordType.createId(getHashForString(url));

  let size;
  let isAnimated;
  let shapeType;

  if (IMAGE_TYPES.includes(file.type)) {
    shapeType = "image";
    size = await MediaHelpers.getImageSizeFromSrc(url);
    isAnimated = file.type === "image/gif" && (await isGifAnimated(file));
  } else {
    shapeType = "video";
    isAnimated = true;
    size = await MediaHelpers.getVideoSizeFromSrc(url);
  }

  const asset = AssetRecordType.create({
    id: assetId,
    type: shapeType,
    typeName: "asset",
    props: {
      name: file.name,
      src: url,
      w: size.w,
      h: size.h,
      mimeType: file.type,
      isAnimated
    }
  });

  return asset;
}
