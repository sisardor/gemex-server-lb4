import {
  BelongsToAccessor,
  DefaultCrudRepository,
  juggler,
  repository,
} from '@loopback/repository';
import {Product, Category} from '../models';
import {MongodbDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import {CategoryRepository} from './category.repository'

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id
> {
  public readonly category: BelongsToAccessor<
    Category,
    typeof Product.prototype.id
  >;
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('CategoryRepository')
      protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Product, dataSource);

    this.category = this._createBelongsToAccessorFor(
      'categoryId',
      categoryRepositoryGetter,
    );
  }
}
