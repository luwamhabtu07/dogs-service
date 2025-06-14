
import { Injectable, NotFoundException } from '@nestjs/common';
import { Dog } from './dog.interface';

@Injectable()
export class DogsService {
  private dogs: Dog[] = [];
  private idCounter = 1;

  findAll(): Dog[] {
    return this.dogs;
  }

  findOne(id: number): Dog {
    const dog = this.dogs.find(d => d.id === id);
    if (!dog) throw new NotFoundException('Dog not found');
    return dog;
  }

  create(dog: Omit<Dog, 'id'>): Dog {
    const newDog = { id: this.idCounter++, ...dog };
    this.dogs.push(newDog);
    return newDog;
  }

  update(id: number, updated: Omit<Dog, 'id'>): Dog {
    const index = this.dogs.findIndex(d => d.id === id);
    if (index === -1) throw new NotFoundException('Dog not found');
    this.dogs[index] = { id, ...updated };
    return this.dogs[index];
  }

  delete(id: number): void {
    const index = this.dogs.findIndex(d => d.id === id);
    if (index === -1) throw new NotFoundException('Dog not found');
    this.dogs.splice(index, 1);
  }
}
