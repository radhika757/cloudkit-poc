import { Controller, Get, Inject } from "@nestjs/common";

@Controller("imagekit")
export class ImageController {
  constructor(@Inject("IMAGEKIT") private imagekit) {}

  @Get("auth")
  getAuthParams() {
    return this.imagekit.getAuthenticationParameters();
  }
}
