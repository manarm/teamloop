import clsx from 'clsx';
import styles from './Button.module.scss';

export default function Button({children, standOut, ...rest}) {
  const { origClassName } = rest;
  const className = clsx(origClassName, styles.button, standOut && styles.standOut);
  return <button className={className} {...rest}>{children}</button>
}