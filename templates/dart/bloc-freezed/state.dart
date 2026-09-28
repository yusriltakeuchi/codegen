// Created on ${DAY}-${MONTH}-${YEAR} ${HOUR}:${MINUTE} by ${USER}

part of '${NAME}_bloc.dart';

@freezed
class ${NAME_CAPITALIZED}State with _$${NAME_CAPITALIZED}State {
  const factory ${NAME_CAPITALIZED}State.initial() = _${NAME_CAPITALIZED}InitialState;
  const factory ${NAME_CAPITALIZED}State.loading() = _${NAME_CAPITALIZED}LoadingState;
  const factory ${NAME_CAPITALIZED}State.error(String message) = _${NAME_CAPITALIZED}ErrorState;
  const factory ${NAME_CAPITALIZED}State.loaded({
    required List<ItemType> items,
    required int page,
    required bool hasReachedMax,
    required bool onLoadMore,
  }) = _${NAME_CAPITALIZED}LoadedState;
}
