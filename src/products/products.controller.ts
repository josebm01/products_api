import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PaginationDto } from '../common/index.js';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ description: 'Product created' })
  @ApiBadRequestResponse({ description: 'Invalid product data' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'List available products with pagination' })
  @ApiOkResponse({ description: 'Paginated list of products' })
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID (cuid)' })
  @ApiOkResponse({ description: 'Product found' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async findOne(@Param('id') id: string) {

    const product = await this.productsService.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'Product ID (cuid)' })
  @ApiOkResponse({ description: 'Product updated' })
  @ApiBadRequestResponse({ description: 'Invalid product data' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a product (marks it as unavailable)' })
  @ApiParam({ name: 'id', description: 'Product ID (cuid)' })
  @ApiOkResponse({ description: 'Product marked as unavailable' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
