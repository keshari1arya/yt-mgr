import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EditorService } from './editor.service';
import { CreateEditorDto } from './dto/create-editor.dto';
import { UpdateEditorDto } from './dto/update-editor.dto';

@Controller('editor')
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  @Post()
  create(@Body() createEditorDto: CreateEditorDto) {
    return this.editorService.create(createEditorDto);
  }

  @Get()
  findAll() {
    return this.editorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEditorDto: UpdateEditorDto) {
    return this.editorService.update(+id, updateEditorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editorService.remove(+id);
  }
}
