import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto } from './__dtos__/create-user.dto';
import { ReturnUser } from './__dtos__/return-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @GrpcMethod('UserService', 'FindOne')
    findOne(data: { id: string }): ReturnUser {
        return this.userService.findOne(data.id);
    }

    @GrpcMethod('UserService', 'CreateUser')
    create(data: CreateUserDto): ReturnUser {
        return this.userService.create(data);
    }

    @GrpcMethod('UserService', 'FindAll')
    findAll(_: {}): { users: ReturnUser[] } {
        const users = this.userService.findAll();
        return { users };
    }
}
