// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

import 'package:dio/dio.dart';

class ${NAME_PASCAL_CASE}Service {
  final Dio _dio;

  ${NAME_PASCAL_CASE}Service(this._dio);

  Future<Response> fetch${NAME_PASCAL_CASE}(String id) async {
    return await _dio.get('/api/${NAME_PLURAL_SNAKE_CASE}/$id');
  }

  Future<Response> fetchAll${NAME_PASCAL_CASE_PLURAL}() async {
    return await _dio.get('/api/${NAME_PLURAL_SNAKE_CASE}');
  }

  Future<Response> create${NAME_PASCAL_CASE}(Map<String, dynamic> data) async {
    return await _dio.post('/api/${NAME_PLURAL_SNAKE_CASE}', data: data);
  }

  Future<Response> update${NAME_PASCAL_CASE}(String id, Map<String, dynamic> data) async {
    return await _dio.put('/api/${NAME_PLURAL_SNAKE_CASE}/$id', data: data);
  }

  Future<Response> delete${NAME_PASCAL_CASE}(String id) async {
    return await _dio.delete('/api/${NAME_PLURAL_SNAKE_CASE}/$id');
  }
}
