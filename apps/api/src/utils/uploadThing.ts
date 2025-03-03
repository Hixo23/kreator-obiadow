import { createUploadthing, type FileRouter } from 'uploadthing/express';

const f = createUploadthing();
export const uploadRouter: FileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log('upload completed', data);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
