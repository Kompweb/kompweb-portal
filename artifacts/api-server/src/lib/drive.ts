// Google Drive integration via Replit Connectors SDK
import { ReplitConnectors } from "@replit/connectors-sdk";

const ROOT_FOLDER_NAME = "Kompweb Client Files";
let cachedRootFolderId: string | null = null;
const clientFolderCache = new Map<string, string>();
const projectFolderCache = new Map<string, string>();

function getConnectors() {
  return new ReplitConnectors();
}

async function getOrCreateFolder(
  name: string,
  parentId: string
): Promise<string> {
  const connectors = getConnectors();
  const query = encodeURIComponent(
    `name='${name.replace(/'/g, "\\'")}' and mimeType='application/vnd.google-apps.folder' and '${parentId}' in parents and trashed=false`
  );
  const searchRes = await connectors.proxy(
    "google-drive",
    `/drive/v3/files?q=${query}&fields=files(id,name)`,
    { method: "GET" }
  );
  const searchData = (await searchRes.json()) as { files: { id: string }[] };

  if (searchData.files?.length > 0) return searchData.files[0].id;

  const createRes = await connectors.proxy("google-drive", "/drive/v3/files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    }),
  });
  const created = (await createRes.json()) as { id: string };
  return created.id;
}

async function getRootFolderId(): Promise<string> {
  if (cachedRootFolderId) return cachedRootFolderId;

  const connectors = getConnectors();
  const query = encodeURIComponent(
    `name='${ROOT_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false and 'root' in parents`
  );
  const searchRes = await connectors.proxy(
    "google-drive",
    `/drive/v3/files?q=${query}&fields=files(id,name)`,
    { method: "GET" }
  );
  const searchData = (await searchRes.json()) as { files: { id: string }[] };

  if (searchData.files?.length > 0) {
    cachedRootFolderId = searchData.files[0].id;
    return cachedRootFolderId!;
  }

  const createRes = await connectors.proxy("google-drive", "/drive/v3/files", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: ROOT_FOLDER_NAME,
      mimeType: "application/vnd.google-apps.folder",
    }),
  });
  const created = (await createRes.json()) as { id: string };
  cachedRootFolderId = created.id;
  return cachedRootFolderId!;
}

// Returns the folder ID for: Root / clientName / projectTitle
async function getOrCreateProjectFolder(
  clientName: string,
  projectTitle: string,
  projectId: number
): Promise<string> {
  const cacheKey = `${clientName}::${projectId}`;
  if (projectFolderCache.has(cacheKey)) return projectFolderCache.get(cacheKey)!;

  const rootId = await getRootFolderId();

  // Client-level folder
  let clientFolderId = clientFolderCache.get(clientName);
  if (!clientFolderId) {
    clientFolderId = await getOrCreateFolder(clientName, rootId);
    clientFolderCache.set(clientName, clientFolderId);
  }

  // Project-level subfolder (name = project title)
  const projectFolderName = projectTitle || `Project #${projectId}`;
  const projectFolderId = await getOrCreateFolder(projectFolderName, clientFolderId);
  projectFolderCache.set(cacheKey, projectFolderId);
  return projectFolderId;
}

export interface DriveUploadResult {
  driveFileId: string;
  driveWebViewLink: string;
}

export async function uploadFileToDrive(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  projectId: number,
  projectTitle: string,
  clientName: string
): Promise<DriveUploadResult> {
  const connectors = getConnectors();
  const folderId = await getOrCreateProjectFolder(clientName, projectTitle, projectId);

  const boundary = `kompweb_${Date.now()}`;
  const metadata = JSON.stringify({ name: originalName, parents: [folderId] });
  const metaPart = `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n`;
  const mediaPart = `--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`;
  const closing = `\r\n--${boundary}--`;

  const body = Buffer.concat([
    Buffer.from(metaPart, "utf-8"),
    Buffer.from(mediaPart, "utf-8"),
    buffer,
    Buffer.from(closing, "utf-8"),
  ]);

  const uploadRes = await connectors.proxy(
    "google-drive",
    `/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink`,
    {
      method: "POST",
      headers: {
        "Content-Type": `multipart/related; boundary=${boundary}`,
        "Content-Length": String(body.length),
      },
      body,
    }
  );

  const uploaded = (await uploadRes.json()) as { id: string; webViewLink: string };
  if (!uploaded.id) throw new Error(`Drive upload failed: ${JSON.stringify(uploaded)}`);

  return {
    driveFileId: uploaded.id,
    driveWebViewLink: uploaded.webViewLink ?? `https://drive.google.com/file/d/${uploaded.id}/view`,
  };
}

export async function downloadFileFromDrive(driveFileId: string): Promise<Buffer> {
  const connectors = getConnectors();
  const res = await connectors.proxy("google-drive", `/drive/v3/files/${driveFileId}?alt=media`, {
    method: "GET",
  });
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function deleteFileFromDrive(driveFileId: string): Promise<void> {
  const connectors = getConnectors();
  await connectors.proxy("google-drive", `/drive/v3/files/${driveFileId}`, {
    method: "DELETE",
  });
}
