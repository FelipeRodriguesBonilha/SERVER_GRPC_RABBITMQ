import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './__dtos__/create-user.dto';
import { ReturnUser } from './__dtos__/return-user.dto';
import { User } from './__entities__/user.entity';

@Injectable()
export class UserService {
    private static users: User[] = [];

    public create(createUserDto: CreateUserDto): ReturnUser {
        const user: User = {
            id: uuidv4(),
            ...createUserDto,
        };

        UserService.users.push(user);

        return new ReturnUser(user);
    }

    public findOne(id: string): ReturnUser {
        const user = UserService.users.find((user) => user.id === id);

        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return new ReturnUser(user);
    }

    public findAll(): User[] {
        return UserService.users.map((user) => new ReturnUser(user));
    }

    public update(id: string, updateData: Partial<CreateUserDto>): ReturnUser {
        const index = UserService.users.findIndex((user) => user.id === id);

        if (index === -1) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        UserService.users[index] = {
            ...UserService.users[index],
            ...updateData,
        };

        return new ReturnUser(UserService.users[index]);
    }

    public delete(id: string): void {
        const index = UserService.users.findIndex((user) => user.id === id);

        if (index === -1) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        UserService.users.splice(index, 1);
    }
}
