import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignColectivosDto } from './dto/assign-colectivos.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth-guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post(':id/assign-colectivos')
  @UseGuards(JwtAuthGuard)
  assignColectivos(@Param('id') id: string, @Body() assignColectivosDto: AssignColectivosDto) {
    return this.userService.assignColectivos(id, assignColectivosDto);
  }

  @Get(':id/colectivos')
  findColectivos(@Param('id') id: string) {
    return this.userService.findColectivos(id);
  }
}
