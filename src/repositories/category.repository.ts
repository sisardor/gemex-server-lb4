import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  juggler,
  repository,
} from '@loopback/repository';
import {Category, Product} from '../models';
import {MongodbDataSource} from '../datasources';
import {ProductRepository} from './product.repository'

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id
> {
  public readonly products: HasManyRepositoryFactory<
    Product,
    typeof Category.prototype.id
  >;
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter(ProductRepository)
      protected getProductRepository: Getter<ProductRepository>,
  ) {
    super(Category, dataSource);
    this.products = this._createHasManyRepositoryFactoryFor(
      'products',
      getProductRepository,
    );
  }
}
