import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('file upload')
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  create() {
    return this.fileUploadService.uploadFile();
  }
}
