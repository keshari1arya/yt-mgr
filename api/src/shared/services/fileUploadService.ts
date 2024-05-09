import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
  s3: AWS.S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('SECRET_ACCESS_KEY'),
    });
  }

  async s3_upload(
    file: string,
    bucket: string,
    name: string,
    mimetype: string,
    download: boolean = false,
  ): Promise<string | undefined> {
    const path: any = file;
    const buffer = fs.readFileSync(path);

    const params = {
      Body: buffer,

      Bucket: bucket,
      Key: `sssss/${name}`,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    } as PutObjectRequest;

    try {
      if (download) {
        params.ContentDisposition = 'attachment';
      }
      const s3Response = await this.s3.upload(params).promise();
      return s3Response.Location;
    } catch (e) {
      throw new InternalServerErrorException('Failed to upload to S3');
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    return new Promise((resolve) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          throw new InternalServerErrorException('Failed to delete file');
        } else {
          resolve();
        }
      });
    });
  }
}
