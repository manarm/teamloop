import clsx from 'clsx';
import styles from './Badge.module.scss';

export default function Badge({type}) {
  const typeToSymbol = {
    'TASK': 'Ta',
    'THOUGHT' : 'Th',
    'QUESTION' : 'Qu'
  }
  const className = clsx(styles[type], styles.badge);
  return (
    <span className={className}>
      {typeToSymbol[type]}
    </span>
  )
}

