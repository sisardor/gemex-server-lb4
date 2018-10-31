import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Category} from '../models';
import {CategoryRepository, ProductRepository} from '../repositories';
import {Product} from '../models'
import {ObjectId} from 'mongodb'

export class CategoryController {
  constructor(
    @repository(CategoryRepository) public categoryRepo : CategoryRepository,
    @repository(ProductRepository) public productRepo: ProductRepository,
  ) {}

  @post('/categories', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {'x-ts-type': Category}},
      },
    },
  })
  async create(@requestBody() category: Category): Promise<Category> {
    return await this.categoryRepo.create(category);
  }

  @get('/categories/count', {
    responses: {
      '200': {
        description: 'Category model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where,
  ): Promise<Count> {
    return await this.categoryRepo.count(where);
  }

  @get('/categories', {
    responses: {
      '200': {
        description: 'Array of Category model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Category}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Category)) filter?: Filter,
  ): Promise<Category[]> {
    console.log('filter',filter)
    return await this.categoryRepo.find(filter);
  }

  @patch('/categories', {
    responses: {
      '200': {
        description: 'Category PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() category: Category,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where,
  ): Promise<Count> {
    return await this.categoryRepo.updateAll(category, where);
  }

  @get('/categories/{id}', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {'x-ts-type': Category}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Category> {
    return await this.categoryRepo.findById(id);
  }

  @patch('/categories/{id}', {
    responses: {
      '204': {
        description: 'Category PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() category: Category,
  ): Promise<void> {
    await this.categoryRepo.updateById(id, category);
  }

  @del('/categories/{id}', {
    responses: {
      '204': {
        description: 'Category DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoryRepo.deleteById(id);
  }


  @post('/categories/{id}/product', {
    responses: {
      '200': {
        description: 'Category.Product model instance',
        content: {'application/json': {schema: {'x-ts-type': Product}}},
      },
    },
  })
  async createProduct (
    @param.path.string('id') categoryId: typeof Category.prototype.id,
    @requestBody() product: Product,
  ): Promise<Product> {
    product.categoryId = new ObjectId(categoryId)
    console.log(product)
    return await this.productRepo.create(product);
  }

  @get('/categories/{id}/products', {
    responses: {
      '200': {
        description: 'Get all products for given category',
        content: {'application/json': {'x-ts-type': Category}},
      },
    },
  })
  async getCategoryProducts(
    @param.path.string('id') categoryId: typeof Category.prototype.id,
  ): Promise<Product[]> {
    let filter:Filter = { where: { categoryId: new ObjectId(categoryId) }};
    return await this.productRepo.find(filter);
  }

}
