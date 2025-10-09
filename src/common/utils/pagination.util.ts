import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationDto } from '../dtos/pagination.dto';
import { PaginatedResult } from '../interfaces/pagination.interface';

export async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  pagination: PaginationDto
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10 } = pagination;
  const skip = (page - 1) * limit;

  const [data, total] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

