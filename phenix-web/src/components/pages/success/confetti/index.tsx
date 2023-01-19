import styles from "./Confetti.module.css";

export function Confetti() {
  return (
    <div id={styles.confettis}>
      {Array.from({ length: 32 }, (_, index) => (
        <div key={index} className={styles.confetti} />
      ))}
    </div>
  );
}
