// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

abstract class ${NAME_PASCAL_CASE}Repository {
  Future<${NAME_PASCAL_CASE}Entity> get${NAME_PASCAL_CASE}(String id);
  Future<List<${NAME_PASCAL_CASE}Entity>> getAll${NAME_PASCAL_CASE_PLURAL}();
  Future<void> save${NAME_PASCAL_CASE}(${NAME_PASCAL_CASE}Entity entity);
  Future<void> delete${NAME_PASCAL_CASE}(String id);
}
