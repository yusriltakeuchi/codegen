// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

import 'package:flutter/material.dart';

class ${NAME_PASCAL_CASE}Screen extends StatelessWidget {
  const ${NAME_PASCAL_CASE}Screen({super.key});

  static const String routeName = '/${NAME_KEBAB_CASE}';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('${NAME_TITLE_CASE}'),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '${NAME_TITLE_CASE}',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              const SizedBox(height: 16),
              // Build your UI widgets here
            ],
          ),
        ),
      ),
    );
  }
}
