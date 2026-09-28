// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

import 'package:flutter/material.dart';

class ${NAME_PASCAL_CASE}Widget extends StatelessWidget {
  final String? title;
  final VoidCallback? onTap;

  const ${NAME_PASCAL_CASE}Widget({
    super.key,
    this.title,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: Text(
                title ?? '${NAME_TITLE_CASE}',
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
            const Icon(Icons.chevron_right),
          ],
        ),
      ),
    );
  }
}
