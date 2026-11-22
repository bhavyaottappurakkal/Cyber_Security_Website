const DB_NAME = "cyber_media_db";
const STORE_NAME = "media";
const urlCache = new Map();

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveMediaFile(file) {
  const db = await openDB();
  const key = `idb://${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(file, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
  urlCache.set(key, URL.createObjectURL(file));
  return key;
}

export async function resolveMediaUrl(src) {
  if (!src || !src.startsWith("idb://")) return src;
  if (urlCache.has(src)) return urlCache.get(src);
  try {
    const db = await openDB();
    const blob = await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(src);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    if (!blob) return "";
    const objectUrl = URL.createObjectURL(blob);
    urlCache.set(src, objectUrl);
    return objectUrl;
  } catch {
    return "";
  }
}

export async function deleteMediaFile(src) {
  if (!src || !src.startsWith("idb://")) return;
  if (urlCache.has(src)) {
    URL.revokeObjectURL(urlCache.get(src));
    urlCache.delete(src);
  }
  try {
    const db = await openDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).delete(src);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    // ignore cleanup errors
  }
}

