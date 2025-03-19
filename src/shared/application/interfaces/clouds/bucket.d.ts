export interface UploadFromFolderInput {
    bucketName: string
    filePath: string
    destinationPath: string
}

export interface UploadFromBufferInput {
    bucketName: string
    data: Buffer
    destinationPath: string
}

export interface DeleteFileInput {
    bucketName: string
    destinationPath: string
}

export interface Bucket {
    uploadFromFolder(data: UploadFromFolderInput): Promise<string>
    uploadFromBuffer(data: UploadFromBufferInput): Promise<string>
    deleteFile(data: DeleteFileInput): Promise<void>
}
