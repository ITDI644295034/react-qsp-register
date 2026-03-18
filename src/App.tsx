import "./App.css";

function App() {
  return (
    <>
      <div id="loadingOverlay" className="hidden">
        <div className="spinner-border text-success" role="status"></div>
        <div className="mt-4 fw-medium text-success fs-5">
          กำลังส่งข้อมูล...
        </div>
      </div>

      <div className="px-4">
        <div className="bg-[#ffffff] max-w-[680px] my-[20px] mx-auto rounded-3xl overflow-hidden border-2 border-gray-200">
          <div className="flex flex-col p-8 text-white relative bg-linear-to-br from-[#11261b] to-[#173627]">
            <div className="max-w-full h-auto  ">
              <img
                src="https://lh3.googleusercontent.com/u/0/d/1FtjG60AJ6ADRan9JIvHJaX9lRBsewjkT"
                alt="Logo"
                className="w-full h-auto object-cover  mb-6 p-1.5 rounded-3xl"
                title="QSP REUNION"
              />
            </div>
            <div className="d-flex justify-content-center align-items-center ">
              <img
                src="https://lh3.googleusercontent.com/u/0/d/1ZZgys4y8cofe4A6D2zxAOi6OwnH304l4"
                alt="t-shirt"
                className="h-auto object-cover p-1.5 items-center"
                title="t-shirt"
              />
            </div>

            <div className="mt-8 pt-8  border-t-2 border-dashed border-amber-200">
              <div className="text-2xl text-[#facc15] mb-4">
                ⏳ ปิดระบบอัตโนมัติในอีก
              </div>
              <div className="flex justify-center gap-2 flex-wrap">
                <div className="bg-amber-100 text-black p-3 rounded-2xl min-w-[68px] text-center shadow-2xl transition-all">
                  <div className="text-3xl font-bold  leading-none" id="cd-days">
                    01
                  </div>
                  <div className="countdown-label">วัน</div>
                </div>
                <div className="bg-amber-100 text-black p-3 rounded-2xl min-w-[68px] text-center shadow-2xl transition-all">
                  <div className="text-3xl font-bold  leading-none" id="cd-hours">
                    16
                  </div>
                  <div className="countdown-label">ชม.</div>
                </div>
                <div className="bg-amber-100 text-black p-3 rounded-2xl min-w-[68px] text-center shadow-2xl transition-all">
                  <div className="text-3xl font-bold  leading-none" id="cd-minutes">
                    15
                  </div>
                  <div className="countdown-label">นาที</div>
                </div>
                <div className="bg-amber-100 text-black p-3 rounded-2xl min-w-[68px] text-center shadow-2xl transition-all">
                  <div className="text-3xl font-bold  leading-none" id="cd-seconds">
                    49
                  </div>
                  <div className="countdown-label">วินาที</div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <form id="iftarForm">
              <input
                type="hidden"
                name="userType"
                id="userType"
                value="ศิษย์เก่า"
              />

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">
                    ชื่อ-นามสกุล <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="นาย,นาง,นางสาว...."
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">เบอร์ติดต่อ</label>
                  <label className="form-label">
                    เบอร์ติดต่อ <span className="text-danger">*</span>
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    placeholder="08xxxxxxxx (10 หลัก)"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="alert-soft p-3 pb-2">
                  <label className="form-label text-dark mb-1">QSP รุ่น </label>
                  <input
                    type="number"
                    className="form-control border-warning bg-white mt-2 mb-2"
                    name="gradYear"
                    id="gradYearInput"
                    placeholder="เช่น 7"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  ความประสงค์เข้าร่วม <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="activityType"
                  name="activityType"
                >
                  <option value="" selected disabled>
                    -- กรุณาระบุประเภทความประสงค์ --
                  </option>
                  <option value="event">เข้าร่วมกิจกรรม</option>
                  <option value="shirt">สั่งจองเสื้อที่ระลึก</option>
                  <option value="both">เข้าร่วมกิจกรรมและสั่งจองเสื้อ</option>
                </select>
              </div>

              <div className="mb-3" id="sizeOption">
                <label className="form-label">
                  size เสื้อ <span className="text-danger">*</span>
                </label>
                <select
                  name="sizeSelect"
                  id="sizeSelect"
                  className="form-select"
                >
                  <option value="" selected disabled>
                    เลือกไซส์เสื้อ
                  </option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                  <option value="3XL">3XL</option>
                  <option value="4XL">4XL</option>
                </select>
              </div>

              <div id="shirtOptions">
                <div className="mb-3">
                  <label className="form-label">
                    ช่องทางการรับเสื้อที่ระลึก
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="shirtDelivery"
                    name="shirtDelivery"
                  >
                    <option value="">-- กรุณาระบุช่องทางการรับ --</option>
                    <option value="home">Home Delivery (จัดส่งที่บ้าน)</option>
                    <option value="onsite">On-site Pickup (รับหน้างาน)</option>
                  </select>
                </div>

                <div id="addressInput" className="mb-3">
                  <label className="form-label">
                    ข้อมูลที่อยู่สำหรับการจัดส่ง
                    <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="address"
                    placeholder="กรุณาระบุที่อยู่โดยละเอียด (บ้านเลขที่, ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด, รหัสไปรษณีย์)"
                  ></textarea>
                </div>
              </div>

              <div className="payment-box">
                <h5 className="fw-bold mb-2 text-success">
                  <i className="fas fa-qrcode me-2"></i>สแกนเพื่อชำระเงิน
                </h5>
                <div className="price-tag mb-1" id="priceTag">
                  249 บาท
                  <span>/ ตัว</span>
                </div>

                <img
                  src="https://lh3.googleusercontent.com/u/0/d/12VScFnV-jnziKQWSlCs-MMUfpELDVsRA"
                  alt="QR Code"
                  className="qr-code"
                  id="qrCodeImg"
                />

                <div>
                  <button type="button">
                    <i className="fas fa-download me-2"></i>ดาวน์โหลด QR Code
                  </button>
                </div>

                <div className="mt-3 text-start d-inline-block text-muted bg-white p-3 rounded-4">
                  <div className="mb-1">
                    <i className="fas fa-university me-2 w-15px"></i>
                    <span className="fw-medium text-dark">ธนาคาร:</span>{" "}
                    กสิกรไทย
                  </div>
                  <div className="mb-1">
                    <i className="fas fa-hashtag me-2 w-15px"></i>
                    <span className="fw-medium text-dark">เลขบัญชี:</span>
                    1741267442
                  </div>
                  <div className="mb-0">
                    <i className="fas fa-user me-2 w-15px"></i>
                    <span className="fw-medium text-dark">ชื่อบัญชี:</span>
                    นาย มูฮัมหมัดอามีโรล บือราเฮง
                  </div>
                </div>
              </div>

              <div className="mb-4" id="slipUploadSection">
                <label className="form-label">
                  แนบสลิปการโอนเงิน <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className="form-control bg-white"
                  id="fileInput"
                  accept="image/jpeg, image/png, image/jpg"
                />
                <div className="form-text text-muted mt-2 ps-1">
                  <i className="fas fa-compress-arrows-alt me-1 text-success"></i>
                  ระบบจะทำการย่อขนาดไฟล์ภาพให้อัตโนมัติเพื่อความรวดเร็ว
                </div>

                <div id="imagePreviewContainer" className="mt-3 text-center">
                  <p className="text-muted small mb-2 fw-medium">
                    <i className="fas fa-image me-1"></i> ตัวอย่างรูปสลิปที่แนบ
                  </p>
                  <img id="slipPreview" src="" alt="Slip Preview" />
                </div>
              </div>

              <div className="info-card">
                <div className="d-flex align-items-center mb-2 pb-2 border-bottom">
                  <i className="fas fa-bullhorn fa-lg me-3 text-secondary"></i>
                  <div>
                    <strong>ประกาศรายชื่อ:</strong>
                    เร็วๆนี้ทางเพจและกลุ่มเฟซบุ๊กของชมรมฯ
                  </div>
                </div>
                <div className="d-flex align-items-center pt-1">
                  <i className="fab fa-facebook fa-lg me-3"></i>
                  <div>
                    <strong>เพจ:</strong>
                    <a
                      href="https://www.facebook.com/QSP.AlumniAssociation"
                      className="text-decoration-none fw-medium hover-shadow"
                      target="_blank"
                    >
                      ชมรมศิษย์เก่าโปรแกรมอัลกุรอานและวิทยาศาสตร์ - QSP Alumni
                      Association
                    </a>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-submit w-100"
                id="submitBtn"
              >
                <i className="fas fa-paper-plane me-2"></i>
                ส่งข้อมูลยืนยันการลงทะเบียน
              </button>
            </form>
          </div>

          <div className="footer-section">
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="https://lh3.googleusercontent.com/u/0/d/1AU4nqKPbt0s36GQATm7jALbPstUDXzWv"
                alt="Logo"
                className="footer-logo"
              />
              <span className="fw-light">
                โรงเรียนดารุสสาลาม © 2026
                ชมรมศิษย์เก่าโปรแกรมอัลกุรอานและวิทยาศาสตร์
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
