import styles from './NoContent.module.scss';

export default function NoContent() {
  return <div className={styles.message} >
  <p>It's quiet. Too quiet...</p>
  </div>
}