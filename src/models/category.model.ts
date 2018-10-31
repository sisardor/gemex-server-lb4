import {Entity, model, property, hasMany} from '@loopback/repository';
import {Product} from './product.model'

@model()
export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => Product, {keyTo: 'categoryId'})
  products?: Product[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}
