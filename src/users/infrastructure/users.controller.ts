import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, Put, HttpCode } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UpadeteUserDtp } from './dto/upadate-user.dto';
import { SignupUserCase } from '../applicatio/usecases/signup.usercase';
import { SigninUserCase } from '../applicatio/usecases/signin.usercase';
import { SearchParams } from '@/shared/domain/repositories/searchble-repository-contracts';
import { ListUserseCase } from '../applicatio/usecases/listUser.usercase';
import { UpdateUserUserCase } from '../applicatio/usecases/updateuser.usercase';
import { UpadatePasswoerdUserCase } from '../applicatio/usecases/upadate-password.usercase';
import { DeleteUserUserCase } from '../applicatio/usecases/deleteUser.usercase';
import { GetUserCase } from '../applicatio/usecases/getUser.usercase';
import { ListUsersDto } from './dto/list-users.dto';
import { UpdatePasswordDto } from './dto/upadate-password.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('users')
export class UsersController {
  @Inject(SignupUserCase.UserCase)
  private signupUseCase: SignupUserCase.UserCase

  @Inject(SigninUserCase.UserCase)
  private signinUseCase: SigninUserCase.UserCase

  @Inject(UpdateUserUserCase.UserCase)
  private updateUserUseCase: UpdateUserUserCase.UserCase

  @Inject(UpadatePasswoerdUserCase.UserCase)
  private updatePasswordUseCase: UpadatePasswoerdUserCase.UserCase

  @Inject(DeleteUserUserCase.UserCase)
  private deleteUserUseCase: DeleteUserUserCase.UserCase

  @Inject(GetUserCase.UserCase)
  private getUserUseCase: GetUserCase.UserCase

  @Inject(ListUserseCase.UserCase)
  private listUsersUseCase: ListUserseCase.UserCase
  usersService: any;

  @Post()
  async create(@Body() signupDto: SignupDto) {
    return this.signupUseCase.execute(signupDto)
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() signinDto: SigninDto) {
    return this.signinUseCase.execute(signinDto)
  }

  @Get()
  async search(@Query() searchParams: ListUsersDto) {
    return this.listUsersUseCase.execute(searchParams)
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUserUseCase.execute({ id })
  }


  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpadeteUserDtp,
  ) {
    return this.updateUserUseCase.execute({ id,...updateUserDto })
  }

  @Put(':id/password')
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.updatePasswordUseCase.execute({ id, ...updatePasswordDto })
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.deleteUserUseCase.execute({ id })
  }

}

