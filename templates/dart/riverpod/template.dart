// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part '${NAME_SNAKE_CASE}_provider.g.dart';

@riverpod
class ${NAME_PASCAL_CASE}Notifier extends _$${NAME_PASCAL_CASE}Notifier {
  @override
  FutureOr<${NAME_PASCAL_CASE}State> build() async {
    return const ${NAME_PASCAL_CASE}State.initial();
  }

  Future<void> fetch${NAME_PASCAL_CASE}() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      // Implement data fetching logic here
      return const ${NAME_PASCAL_CASE}State.success();
    });
  }
}

class ${NAME_PASCAL_CASE}State {
  const ${NAME_PASCAL_CASE}State.initial();
  const ${NAME_PASCAL_CASE}State.success();
}
