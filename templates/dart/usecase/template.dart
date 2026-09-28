// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

abstract class ${NAME_PASCAL_CASE}UseCase {
  Future<${NAME_PASCAL_CASE}Result> call(${NAME_PASCAL_CASE}Params params);
}

class ${NAME_PASCAL_CASE}UseCaseImpl implements ${NAME_PASCAL_CASE}UseCase {
  final ${NAME_PASCAL_CASE}Repository repository;

  ${NAME_PASCAL_CASE}UseCaseImpl({required this.repository});

  @override
  Future<${NAME_PASCAL_CASE}Result> call(${NAME_PASCAL_CASE}Params params) async {
    return await repository.execute(params);
  }
}

class ${NAME_PASCAL_CASE}Params {
  final String id;
  const ${NAME_PASCAL_CASE}Params({required this.id});
}

class ${NAME_PASCAL_CASE}Result {
  const ${NAME_PASCAL_CASE}Result();
}
