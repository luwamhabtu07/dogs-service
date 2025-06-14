import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { DogsService } from './dogs.service';
  import { Dog } from './dog.interface';
  
  @Controller('dogs')
  export class DogsController {
    constructor(private readonly dogsService: DogsService) {}
  
    @Get()
    getAllDogs(): Dog[] {
      return this.dogsService.findAll();
    }
  
    @Get(':id')
    getDog(@Param('id') id: string): Dog {
      return this.dogsService.findOne(+id);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createDog(@Body() dog: Omit<Dog, 'id'>): Dog {
      return this.dogsService.create(dog);
    }
  
    @Put(':id')
    updateDog(@Param('id') id: string, @Body() dog: Omit<Dog, 'id'>): Dog {
      return this.dogsService.update(+id, dog);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteDog(@Param('id') id: string): void {
      this.dogsService.delete(+id);
    }
  }
  