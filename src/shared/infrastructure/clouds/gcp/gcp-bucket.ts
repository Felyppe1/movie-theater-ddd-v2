import 'dotenv/config'
import { Storage, UploadOptions } from '@google-cloud/storage'
import {
    Bucket,
    DeleteFileInput,
    UploadFromBufferInput,
    UploadFromFolderInput,
} from '../../../application/interfaces/clouds/bucket'

export class GCPBucket implements Bucket {
    private storage = new Storage({
        projectId: process.env.PROJECT_ID,
        keyFilename: 'sa-key.json',
    })

    async uploadFromFolder({
        bucketName,
        filePath,
        destinationPath,
    }: UploadFromFolderInput) {
        destinationPath = this.fixDestinationPath(destinationPath)

        const options: UploadOptions = {
            destination: destinationPath,
        }

        const result = await this.storage
            .bucket(bucketName)
            .upload(filePath, options)

        return `https://storage.googleapis.com/${bucketName}/${destinationPath}`
    }

    async uploadFromBuffer({
        bucketName,
        destinationPath,
        data,
    }: UploadFromBufferInput) {
        destinationPath = this.fixDestinationPath(destinationPath)

        const result = await this.storage
            .bucket(bucketName)
            .file(destinationPath)
            .save(data)

        return `https://storage.googleapis.com/${bucketName}/${destinationPath}`
    }

    async deleteFile({ bucketName, destinationPath }: DeleteFileInput) {
        await this.storage.bucket(bucketName).file(destinationPath).delete({
            ignoreNotFound: true,
        })
    }

    private fixDestinationPath(destinationPath: string) {
        if (destinationPath.charAt(0) === '/') return destinationPath.slice(1)

        return destinationPath
    }
}
