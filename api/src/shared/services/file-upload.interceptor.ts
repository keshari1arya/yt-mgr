import { diskStorage } from 'multer';
import { extname } from 'path';
import { UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

export function FileUploadInterceptor() {
  return UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            extname(file.originalname);
          callback(null, uniqueSuffix);
        },
      }),
    }),
  );
}
