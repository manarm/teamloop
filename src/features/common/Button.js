import clsx from 'clsx';
import styles from './Button.module.scss';

export default function Button({children, standOut, ...rest}) {
  const newClassName = clsx(styles.button, standOut && styles.standOut);
  return <button className={newClassName} {...rest}>{children}</button>
}