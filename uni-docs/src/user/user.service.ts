import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignColectivosDto } from './dto/assign-colectivos.dto';
import { PrismaService } from 'src/prisma.service';
import { hash, compare } from 'bcrypt';
import { Rol } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ✅ AGREGADO: método create() con validaciones
  async create(data: {
    userName: string;
    password: string;
    apellido: string;
    rol?: Rol;
  }) {
    // Verificar si ya existe un usuario con ese userName
    const existingUser = await this.prisma.user.findFirst({
      where: { userName: data.userName }
    });

    if (existingUser) {
      throw new ConflictException(`El usuario "${data.userName}" ya existe`);
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        userName: data.userName,
        password: hashedPassword,
        apellido: data.apellido,
        rol: data.rol ?? Rol.PROFESOR, // Por defecto: PROFESOR
      },
      select: {
        userId: true,
        userName: true,
        rol: true,
        apellido: true,
        createdAt: true,
      },
    });
  }

  // ✅ AGREGADO: método login() con verificación
  async login(userName: string, password: string) {
    // Buscar usuario por userName
    const user = await this.prisma.user.findFirst({
      where: { userName }
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Comparar contraseñas (la guardada está hasheada)
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // No devolver la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user;

    return {
      message: 'Login exitoso',
      user: userWithoutPassword,
    };
  }

  // 👇 TUS MÉTODOS ORIGINALES (sin cambios)

  findAll() {
    return this.prisma.user.findMany({
      select: {
        userId: true,
        userName: true,
        rol: true,
        apellido: true,
        createdAt: true,
        colectivos: true
      }
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { userId: id },
      include: { colectivos: true, tareas: true }
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExist = await this.prisma.user.findUnique({
      where: { userId: id }
    });
    if (!userExist) throw new NotFoundException('Este usuario no existe');

    const updateData: any = {};
    if (updateUserDto.userName) updateData.userName = updateUserDto.userName;
    if (updateUserDto.apellido) updateData.apellido = updateUserDto.apellido;
    if (updateUserDto.rol) updateData.rol = updateUserDto.rol;

    return this.prisma.user.update({
      where: { userId: id },
      data: updateData,
      select: {
        userId: true,
        userName: true,
        rol: true,
        apellido: true,
        createdAt: true,
        colectivos: true
      }
    });
  }

  async remove(id: string) {
    const userExist = await this.prisma.user.findUnique({
      where: { userId: id }
    });
    if (!userExist) throw new NotFoundException('Este usuario no existe');

    // Limpiar relaciones antes de eliminar
    await this.prisma.colectivoProfesor.deleteMany({
      where: { userId: id }
    });

    return this.prisma.user.delete({
      where: { userId: id }
    });
  }

  async assignColectivos(userId: string, assignColectivosDto: AssignColectivosDto) {
    const userExist = await this.prisma.user.findUnique({
      where: { userId: userId }
    });
    if (!userExist) throw new NotFoundException('Este usuario no existe');

    // Eliminar colectivos anteriores
    await this.prisma.colectivoProfesor.deleteMany({
      where: { userId: userId }
    });

    // Verificar que todos los colectivos existen antes de asignar
    for (const colectivo of assignColectivosDto.colectivos) {
      const colectivoExist = await this.prisma.colectivo.findUnique({
        where: { colectivoId: colectivo.colectivoId }
      });
      if (!colectivoExist) {
        throw new NotFoundException(`El colectivo ${colectivo.colectivoId} no existe`);
      }
    }

    // Crear las nuevas asignaciones
    for (const colectivo of assignColectivosDto.colectivos) {
      await this.prisma.colectivoProfesor.create({
        data: {
          colectivoId: colectivo.colectivoId,
          userId: userId,
          asignatura: colectivo.asignatura
        }
      });
    }

    return this.prisma.user.findUnique({
      where: { userId: userId },
      include: { colectivos: { include: { colectivo: true } } }
    });
  }

  findColectivos(userId: string) {
    return this.prisma.colectivoProfesor.findMany({
      where: { userId: userId },
      include: { colectivo: true }
    });
  }
  findByUserName(userName: string) {
  return this.prisma.user.findFirst({
    where: { userName }
  });
  }

}
