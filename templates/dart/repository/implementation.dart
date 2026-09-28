// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

import '${NAME_SNAKE_CASE}_repository.dart';

class ${NAME_PASCAL_CASE}RepositoryImpl implements ${NAME_PASCAL_CASE}Repository {
  final ${NAME_PASCAL_CASE}RemoteDataSource remoteDataSource;

  ${NAME_PASCAL_CASE}RepositoryImpl({
    required this.remoteDataSource,
  });

  @override
  Future<${NAME_PASCAL_CASE}Entity> get${NAME_PASCAL_CASE}(String id) async {
    final dto = await remoteDataSource.get${NAME_PASCAL_CASE}(id);
    return dto.toEntity();
  }

  @override
  Future<List<${NAME_PASCAL_CASE}Entity>> getAll${NAME_PASCAL_CASE_PLURAL}() async {
    final dtoList = await remoteDataSource.getAll${NAME_PASCAL_CASE_PLURAL}();
    return dtoList.map((dto) => dto.toEntity()).toList();
  }

  @override
  Future<void> save${NAME_PASCAL_CASE}(${NAME_PASCAL_CASE}Entity entity) async {
    await remoteDataSource.save${NAME_PASCAL_CASE}(entity.toDto());
  }

  @override
  Future<void> delete${NAME_PASCAL_CASE}(String id) async {
    await remoteDataSource.delete${NAME_PASCAL_CASE}(id);
  }
}
