export interface Organization {
  /** Số lượng quản trị viên chính */
  admin_count: number;
  /** URL ảnh đại diện */
  avatar: string;
  /** Thời gian tạo */
  created_at: string;
  /** Mô tả tổ chức */
  description: string;
  /** ID duy nhất của tổ chức */
  id: string;
  /** Lĩnh vực hoạt động */
  industry: string;
  /** Tổng số thành viên */
  member_count: number;
  /** Tên tổ chức */
  name: string;
  /** Khu vực/Vùng */
  region: string;
  /** Quy mô (ví dụ: số lượng nhân viên) */
  size: number;
  /** Số lượng quản trị viên phụ */
  sub_admin_count: number;
  /** Thời gian cập nhật gần nhất */
  updated_at: string;
}
