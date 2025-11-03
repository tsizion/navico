// src/features/file/domain/FileModel.js
export class FileModel {
  constructor({ filename, url, mimetype, size, createdAt }) {
    this.filename = filename;
    this.url = url;
    this.mimetype = mimetype;
    this.size = size;
    this.createdAt = createdAt || new Date();
  }
}
