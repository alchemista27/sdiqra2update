import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async getAllMedia(page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.media.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.media.count(),
    ]);
    
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async uploadFile(file: any, userId: string, folder?: string) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder || 'iqra2' },
        async (error, result) => {
          if (error) return reject(error);
          
          if (result) {
            const media = await this.prisma.media.create({
              data: {
                filename: result.original_filename,
                originalName: file.originalname,
                path: result.public_id,
                url: result.secure_url,
                mimeType: file.mimetype,
                size: file.size,
                cloudinaryId: result.public_id,
                cloudinaryUrl: result.secure_url,
                uploadedById: userId,
              }
            });
            resolve(media);
          }
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteMedia(id: string) {
    const media = await this.prisma.media.findUnique({ where: { id } });
    if (media?.cloudinaryId) {
      await cloudinary.uploader.destroy(media.cloudinaryId);
    }
    await this.prisma.media.delete({ where: { id } });
    return { success: true };
  }
}
