import 'package:freezed_annotation/freezed_annotation.dart';
part '${NAME}_dto.freezed.dart';
part '${NAME}_dto.g.dart';

@Freezed(fromJson: false, toJson: true)
class ${NAME_CAPITALIZED}DTO with _$${NAME_CAPITALIZED}DTO {
  const factory ${NAME_CAPITALIZED}DTO({
    @JsonKey(name: 'name') required String name,
    @JsonKey(name: 'email') required String email,
  }) = _${NAME_CAPITALIZED}DTO;
}
