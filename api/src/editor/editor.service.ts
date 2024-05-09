import { Injectable } from '@nestjs/common';
import { CreateEditorDto } from './dto/create-editor.dto';
import { UpdateEditorDto } from './dto/update-editor.dto';

@Injectable()
export class EditorService {
  create(createEditorDto: CreateEditorDto) {
    return 'This action adds a new editor';
  }

  findAll() {
    return `This action returns all editor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} editor`;
  }

  update(id: number, updateEditorDto: UpdateEditorDto) {
    return `This action updates a #${id} editor`;
  }

  remove(id: number) {
    return `This action removes a #${id} editor`;
  }
}
