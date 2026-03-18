import { useState, useEffect } from "react";
import { pad, getCountdownState } from "../utils/helpers";
import { styles } from "../styles/styles";

export default function Countdown() {
  const [state, setState] = useState(getCountdownState);

  useEffect(() => {
    const id = setInterval(() => {
      const s = getCountdownState();
      setState(s);
      if (s.status === "closed") clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const { distance, status } = state;
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  const title =
    status === "before"
      ? "⏳ จะเปิดรับลงทะเบียนในอีก"
      : status === "open"
        ? "⏳ ปิดระบบอัตโนมัติในอีก"
        : "⛔ ระบบปิดรับลงทะเบียนแล้ว";

  const items = [
    { val: days, label: "วัน" },
    { val: hours, label: "ชม." },
    { val: minutes, label: "นาที" },
    { val: seconds, label: "วินาที" },
  ];

  return (
    <div style={styles.countdownContainer}>
      <div style={styles.countdownTitle}>{title}</div>
      <div style={styles.countdownRow}>
        {items.map(({ val, label }) => (
          <div key={label} className="qsp-countdown-item" style={styles.countdownItem}>
            <div style={styles.countdownValue}>{pad(val)}</div>
            <div style={styles.countdownLabel}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
