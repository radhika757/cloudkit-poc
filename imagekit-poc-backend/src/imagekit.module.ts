import { Module } from "@nestjs/common";
import ImageKit from "imagekit";

@Module({
  providers: [
    {
      provide: "IMAGEKIT",
      useFactory: () => {
        console.log("ImageKit config:", {
          publicKey: process.env.IMAGEKIT_PUBLIC_KEY ? process.env.IMAGEKIT_PUBLIC_KEY : "✗ missing",
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY ? "✓ loaded" : "✗ missing",
          urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT ? "✓ loaded" : "✗ missing",
        });
        return new ImageKit({
          publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
          urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
        } as any);
      },
    },
  ],
  exports: ["IMAGEKIT"],
})
export class ImagekitModule {}
