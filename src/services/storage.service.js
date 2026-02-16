import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

/**
 * Uploads a file to Firebase Storage and returns the download URL.
 * @param {File} file - The file to upload.
 * @param {string} path - The path in storage (e.g., 'projects/images').
 * @returns {Promise<string>} - The download URL.
 */
export const uploadFile = async (file, path) => {
  if (!file) return null;

  try {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Uploads a project cover image.
 * @param {File} file
 * @returns {Promise<string>}
 */
export const uploadProjectImage = async (file) => {
  return uploadFile(file, 'projects/covers');
};

/**
 * Uploads a project gallery image.
 * @param {File} file
 * @returns {Promise<string>}
 */
export const uploadGalleryImage = async (file) => {
  return uploadFile(file, 'projects/gallery');
};

/**
 * Uploads a user profile photo.
 * @param {File} file
 * @returns {Promise<string>}
 */
export const uploadUserPhoto = async (file) => {
  return uploadFile(file, 'users/photos');
};
