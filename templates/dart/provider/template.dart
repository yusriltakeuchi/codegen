// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

import 'package:flutter/foundation.dart';

class ${NAME_PASCAL_CASE}Provider extends ChangeNotifier {
  bool _isLoading = false;
  String? _errorMessage;

  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> init${NAME_PASCAL_CASE}() async {
    _setLoading(true);
    try {
      // Implement data fetching or state initialization
      _errorMessage = null;
    } catch (e) {
      _errorMessage = e.toString();
    } finally {
      _setLoading(false);
    }
  }

  void _setLoading(bool value) {
    _isLoading = value;
    notifyListeners();
  }
}
