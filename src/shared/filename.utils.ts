import { randomUUID } from 'crypto';

export const createFileName = (idUser) => {
  const filename = `${randomUUID()}-profile-photo-${idUser}`;
  return filename;
};

export const replaceFileName = (filename: string) => {
  let originalFilename = filename.split('/')[filename.split('/').length - 1];
  originalFilename = originalFilename.substring(0, originalFilename.length - 1);
  return originalFilename;
};
