import clsx from 'clsx';
import styles from './Badge.module.scss';

const makeBadge = (text, type) => {
  return <span className={ clsx(styles[type], styles.badge) }>{text}</span>
}

const Badge = {
  Task: function() {
    return makeBadge('Ta', 'task')
  },
  Thought: function() {
    return makeBadge('Th', 'thought')
  },
  Question: function() {
    return makeBadge('Qu', 'question')
  }
}

export default Badge;