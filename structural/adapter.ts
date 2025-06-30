/** Precisamos adaptar uma interface a outra, mesmo que ela seja incompatível. */

interface StorageService {
  uploadFile(file: string): void;
  getStream(file: string): string;
  deleteFile(file: string): void;
}

export class LocalStorageService implements StorageService {
  uploadFile(file: string): void {
    console.log(`Uploading ${file} to local storage.`);
  }

  getStream(file: string): string {
    return `Stream of ${file} from local storage.`;
  }

  deleteFile(file: string): void {
    console.log(`Deleting ${file} from local storage.`);
  }
}

export class S3StorageService implements StorageService {
  uploadFile(file: string): void {
    console.log(`Uploading ${file} to S3 storage.`);
  }

  getStream(file: string): string {
    return `Stream of ${file} from S3 storage.`;
  }

  deleteFile(file: string): void {
    console.log(`Deleting ${file} from S3 storage.`);
  }
}

