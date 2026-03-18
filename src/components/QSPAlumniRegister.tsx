import { useState, useEffect, useRef } from "react";
import Countdown from "./Countdown";
import Alert from "./Alert";
import type { AlertProps } from "./Alert";
import { APPS_SCRIPT_URL } from "../constants/config";
import { getCountdownState, compressImage } from "../utils/helpers";
import { styles } from "../styles/styles";

interface FormState {
  name: string;
  phone: string;
  gradYear: string;
  sizeSelect: string;
  shirtDelivery: string;
  address: string;
}

type AlertState = Omit<AlertProps, "onClose"> & { onCloseReset?: boolean };

const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Prompt', sans-serif; }
  input, select, textarea, button { font-family: 'Prompt', sans-serif; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes shimmer {
    0%   { left: -100%; }
    100% { left: 150%; }
  }
  .qsp-submit-btn:hover:not(:disabled)::after {
    animation: shimmer 0.6s ease forwards;
  }
  .qsp-submit-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
    transform: skewX(-20deg);
  }
  .qsp-input:focus {
    outline: none;
    border-color: #173627 !important;
    box-shadow: 0 0 0 4px rgba(23,54,39,0.1);
    transform: translateY(-1px);
    background: #fff !important;
  }
  .qsp-countdown-item:hover {
    transform: scale(1.07);
    box-shadow: 0 8px 20px rgba(250,204,21,0.4);
  }
`;

export default function QSPAlumniRegister() {
  const [countdownStatus, setCountdownStatus] = useState(
    () => getCountdownState().status,
  );
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    gradYear: "",
    sizeSelect: "",
    shirtDelivery: "",
    address: "",
  });
  const [slipFile, setSlipFile] = useState<File | null>(null);
  const [slipPreview, setSlipPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // sync countdown status
  useEffect(() => {
    const id = setInterval(() => {
      const s = getCountdownState();
      setCountdownStatus(s.status);
      if (s.status === "closed") clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const isOpen = countdownStatus === "open";
  const isClosed = countdownStatus === "closed";

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSlipFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setSlipPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setSlipPreview(null);
    }
  }

  function resetForm() {
    setForm({
      name: "",
      phone: "",
      gradYear: "",
      sizeSelect: "",
      shirtDelivery: "",
      address: "",
    });
    setSlipFile(null);
    setSlipPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const phoneVal = form.phone.replace(/\D/g, "");
    if (phoneVal.length !== 10 || !phoneVal.startsWith("0")) {
      setAlert({
        type: "warning",
        title: "เบอร์โทรศัพท์ไม่ถูกต้อง",
        message: "กรุณากรอกเบอร์มือถือให้ครบ 10 หลัก (เช่น 08xxxxxxxx)",
      });
      return;
    }

    setLoading(true);
    try {
      const compressedDataUrl = await compressImage(slipFile!, 800, 0.7);
      const payload = {
        name: form.name,
        phone: phoneVal,
        gradYear: form.gradYear,
        activityType: "ร่วมกิจกรรม",
        sizeSelect: form.sizeSelect || "",
        shirtDelivery: "",
        address: form.address.trim() || "",
        slipImage: compressedDataUrl || "",
      };

      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "text/plain;charset=utf-8" },
      });
      const data = await res.json();

      if (data.status === "success") {
        const regTime = new Date().toLocaleString("th-TH", {
          dateStyle: "long",
          timeStyle: "short",
        });
        setAlert({
          type: "success",
          title: "ลงทะเบียนสำเร็จ",
          message: "ระบบได้รับข้อมูลของท่านเรียบร้อยแล้ว",
          detail: [
            { icon: "👤", label: "ชื่อ", value: payload.name },
            { icon: "📞", label: "เบอร์", value: payload.phone },
            { icon: "🎓", label: "QSP รุ่น", value: payload.gradYear || "-" },
            { icon: "🏷️", label: "ประเภท", value: payload.activityType },
            { icon: "🕐", label: "เวลา", value: regTime },
          ],
          onCloseReset: true,
        });
      } else {
        setAlert({
          type: "error",
          title: "เกิดข้อผิดพลาด",
          message: data.message,
        });
      }
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        title: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถประมวลผลข้อมูลได้ในขณะนี้",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleAlertClose() {
    if (alert?.onCloseReset) resetForm();
    setAlert(null);
    window.scrollTo(0, 0);
  }

  const submitLabel = loading
    ? "⏳ กำลังส่งข้อมูล..."
    : isClosed
      ? "🔒 หมดเวลาลงทะเบียนแล้ว"
      : countdownStatus === "before"
        ? "🔒 ยังไม่เปิดรับลงทะเบียน"
        : "✈️ ส่งข้อมูลยืนยันการลงทะเบียน";

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&family=Itim&display=swap"
        rel="stylesheet"
      />
      <style>{globalStyles}</style>

      {/* Loading overlay */}
      {loading && (
        <div style={styles.overlay}>
          <div
            style={{
              width: 56,
              height: 56,
              border: "4px solid #e2e8f0",
              borderTop: "4px solid #173627",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <div
            style={{
              marginTop: 16,
              color: "#173627",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            กำลังส่งข้อมูล...
          </div>
        </div>
      )}

      {/* Alert modal */}
      {alert && <Alert {...alert} onClose={handleAlertClose} />}

      {/* Page */}
      <div style={styles.pageBg}>
        <div style={styles.mainCard}>
          {/* Header */}
          <div style={styles.headerSection}>
            <img
              src="https://lh3.googleusercontent.com/u/0/d/1FtjG60AJ6ADRan9JIvHJaX9lRBsewjkT"
              alt="QSP REUNION"
              style={styles.logoImg}
            />
            <Countdown />
          </div>

          {/* Form */}
          {!isClosed ? (
            <div style={styles.formSection}>
              <form onSubmit={handleSubmit}>
                <input type="hidden" name="userType" value="ศิษย์เก่า" />

                {/* Name + Phone */}
                <div style={styles.row}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={styles.label}>
                      ชื่อ-นามสกุล <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      className="qsp-input"
                      style={styles.input}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="นาย,นาง,นางสาว...."
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={styles.label}>เบอร์ติดต่อ</label>
                    <input
                      className="qsp-input"
                      style={styles.input}
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="08xxxxxxxx (10 หลัก)"
                      maxLength={10}
                    />
                  </div>
                </div>

                {/* Grad year */}
                <div style={{ marginBottom: 24 }}>
                  <div
                    style={{
                      background: "#fffbeb",
                      border: "1.5px solid #fde68a",
                      borderRadius: 16,
                      padding: "16px 16px 12px",
                    }}
                  >
                    <label style={{ ...styles.label, color: "#2c3e50" }}>
                      QSP รุ่น
                    </label>
                    <input
                      className="qsp-input"
                      style={{
                        ...styles.input,
                        borderColor: "#fcd34d",
                        background: "#fff",
                        marginTop: 8,
                      }}
                      type="number"
                      name="gradYear"
                      value={form.gradYear}
                      onChange={handleChange}
                      placeholder="เช่น 7"
                    />
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <div>
                    <label style={styles.label}>ความประสงค์เข้าร่วม</label>
                    <select
                    className="qsp-input"
                    style={styles.input}
                    >
                      <option value="" selected disabled>
                        -- กรุณาระบุประเภทความประสงค์ --
                      </option>
                      <option value="event">เข้าร่วมกิจกรรม</option>
                      <option value="shirt">สั่งจองเสื้อที่ระลึก</option>
                      <option value="both">
                        เข้าร่วมกิจกรรมและสั่งจองเสื้อ
                      </option>
                    </select>
                  </div>
                </div>

                {/* Info card */}
                <div style={styles.infoCard}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 12,
                      paddingBottom: 12,
                      borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <span style={{ fontSize: "1.2rem", marginRight: 12 }}>
                      📢
                    </span>
                    <div style={{ fontSize: "0.95rem" }}>
                      <strong>ประกาศรายชื่อ:</strong>{" "}
                      เร็วๆนี้ทางเพจและกลุ่มเฟซบุ๊กของชมรมฯ
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: "1.2rem",
                        marginRight: 12,
                        color: "#1877f2",
                      }}
                    >
                      📘
                    </span>
                    <div style={{ fontSize: "0.95rem" }}>
                      <strong>เพจ:</strong>{" "}
                      <a
                        href="https://www.facebook.com/QSP.AlumniAssociation"
                        style={{ color: "#1877f2", fontWeight: 500 }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        ชมรมศิษย์เก่าโปรแกรมอัลกุรอานและวิทยาศาสตร์ - QSP Alumni
                        Association
                      </a>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="qsp-submit-btn"
                  disabled={!isOpen || loading}
                  style={{
                    ...styles.submitBtn,
                    width: "100%",
                    cursor: !isOpen || loading ? "not-allowed" : "pointer",
                    opacity: !isOpen || loading ? 0.75 : 1,
                    background:
                      !isOpen || loading
                        ? "#94a3b8"
                        : "linear-gradient(135deg,#23611f,#173627)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {submitLabel}
                </button>
              </form>
            </div>
          ) : (
            <div style={{ padding: "32px 40px", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>⛔</div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
              >
                ระบบปิดรับลงทะเบียนแล้ว
              </p>
            </div>
          )}

          {/* Footer */}
          <div style={styles.footer}>
            <img
              src="https://lh3.googleusercontent.com/u/0/d/1AU4nqKPbt0s36GQATm7jALbPstUDXzWv"
              alt="Logo"
              style={styles.footerLogo}
            />
            <span>
              โรงเรียนดารุสสาลาม © 2026
              ชมรมศิษย์เก่าโปรแกรมอัลกุรอานและวิทยาศาสตร์
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
