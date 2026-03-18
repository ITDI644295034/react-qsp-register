import { styles } from "../styles/styles";

export interface AlertDetail {
  icon: string;
  label: string;
  value: string;
}

export interface AlertProps {
  type?: "success" | "error" | "warning";
  title: string;
  message?: string;
  detail?: AlertDetail[];
  onClose: () => void;
}

export default function Alert({
  type = "success",
  title,
  message,
  detail,
  onClose,
}: AlertProps) {
  if (!title) return null;

  const isSuccess = type === "success";
  const bgColor = isSuccess ? "#f0fdf4" : "#fef2f2";
  const borderColor = isSuccess ? "#1a4d18" : "#ef4444";
  const iconColor = isSuccess ? "#1a4d18" : "#ef4444";
  const icon = isSuccess ? "✓" : "✕";

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, fontFamily: "'Prompt', sans-serif" }}>
        {/* Icon + Title */}
        <div style={{ textAlign: "center", paddingBottom: 8 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: bgColor,
              border: `2px solid ${borderColor}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              color: iconColor,
              marginBottom: 12,
            }}
          >
            {icon}
          </div>
          <h3 style={{ color: iconColor, fontWeight: 700, marginBottom: 4 }}>
            {title}
          </h3>
          {message && (
            <p style={{ color: "#64748b", marginBottom: 0 }}>{message}</p>
          )}
        </div>

        {/* Detail card */}
        {detail && (
          <div
            style={{
              background: `linear-gradient(135deg, ${bgColor}, #ecfdf5)`,
              border: `2px dashed ${borderColor}`,
              borderRadius: 16,
              padding: 20,
              margin: "16px 0",
              textAlign: "left",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <span
                style={{
                  background: "#1a4d18",
                  color: "white",
                  padding: "4px 16px",
                  borderRadius: 20,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                📋 หลักฐานการลงทะเบียน
              </span>
            </div>
            <div style={{ fontSize: "0.9rem", lineHeight: 2 }}>
              {detail.map(({ icon: ic, label, value }) => (
                <div key={label}>
                  <span style={{ marginRight: 8 }}>{ic}</span>
                  <strong>{label}:</strong> {value}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screenshot reminder */}
        {isSuccess && (
          <div
            style={{
              background: "#fffbeb",
              border: "1.5px solid #fbbf24",
              borderRadius: 12,
              padding: "12px 16px",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: "1.4rem" }}>📸</div>
            <p
              style={{
                margin: "6px 0 2px",
                fontWeight: 600,
                color: "#92400e",
                fontSize: "0.95rem",
              }}
            >
              กรุณาแคปหน้าจอนี้เก็บไว้เป็นหลักฐาน
            </p>
            <p style={{ margin: 0, color: "#b45309", fontSize: "0.8rem" }}>
              เพื่อใช้เป็นหลักฐานยืนยันการลงทะเบียนของท่าน
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            ...styles.submitBtn,
            padding: "14px 32px",
            width: "100%",
            cursor: "pointer",
          }}
        >
          เรียบร้อย
        </button>
      </div>
    </div>
  );
}
