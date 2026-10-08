import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { envs } from '../config/envs.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaClient } from '../generated/prisma/client.js';
import { PaginationDto } from '../common/index.js';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductService');

  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: envs.databaseUrl });
    super({ adapter });
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  //* Create a new product
  create(createProductDto: CreateProductDto) {

    // product -> modelo de PrismaClient
    return this.product.create({
      data: createProductDto
    }) 
  }

  //* Find all products with pagination
  async findAll(paginationDto: PaginationDto) {

    const { page = 1, limit = 10 } = paginationDto;
    const total = await this.product.count();
    const lastPage = Math.ceil(total / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit
      }),
      meta: {
        total,
        page,
        lastPage
      }
    };
  }

  findOne(id: string) {
    return this.product.findUnique({
      where: { id }
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
