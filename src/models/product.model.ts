import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Category} from './category.model'

@model()
export class Product extends Entity {
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
  type?: string;

  @property({
    type: 'number',
  })
  price?: number;

  @belongsTo(() => Category, {keyTo: 'pk'})
  categoryId: any;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}
