import { CloudinaryResponse } from './cloudinary/cloudinary-response';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
}
