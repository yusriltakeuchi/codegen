// Created on ${DAY}-${MONTH}-${YEAR} by ${USER}

import React from 'react';
import styles from './${NAME_PASCAL_CASE}.module.css';

export interface ${NAME_PASCAL_CASE}Props {
  className?: string;
  children?: React.ReactNode;
}

export const ${NAME_PASCAL_CASE}: React.FC<${NAME_PASCAL_CASE}Props> = ({
  className = '',
  children,
}) => {
  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>${NAME_TITLE_CASE}</h2>
      {children}
    </div>
  );
};

export default ${NAME_PASCAL_CASE};
