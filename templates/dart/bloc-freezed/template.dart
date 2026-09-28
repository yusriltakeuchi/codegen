// Created on ${DAY}-${MONTH}-${YEAR} ${HOUR}:${MINUTE} by ${USER}

import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part '${NAME}_state.dart';
part '${NAME}_bloc.freezed.dart';

class ${NAME_CAPITALIZED}Bloc extends Cubit<${NAME_CAPITALIZED}State> {
  ${NAME_CAPITALIZED}Bloc() : super(const ${NAME_CAPITALIZED}State.initial());
}
