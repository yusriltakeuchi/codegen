import 'package:freezed_annotation/freezed_annotation.dart';
part '${NAME}_entity.freezed.dart';
part '${NAME}_entity.g.dart';

@freezed
class ${NAME_CAPITALIZED}Entity with _$${NAME_CAPITALIZED}Entity {
  const factory ${NAME_CAPITALIZED}Entity({
    @JsonKey(name: 'name') required String name,
    @JsonKey(name: 'email') required String email,
  }) = _${NAME_CAPITALIZED}Entity;

  factory ${NAME_CAPITALIZED}Entity.fromJson(Map<String, dynamic> json) =>
      _$${NAME_CAPITALIZED}EntityFromJson(json);
}
