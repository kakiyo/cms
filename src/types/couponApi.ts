import { ApiInterface } from "@/hooks/useQueryGen";
import { keyStingObject } from "@/types/general";

export interface CouponDL {
  dl_datetime: string;
  name: string;
  email: string;
}
export interface Coupon extends keyStingObject {
  id: number;
  campaign_id: string;
  chain_store_name: string;
  coupon_text: string;
  started: string;
  ended: string;
  usages: string;
  notes: string;
  chain_store_logo: string;
  coupon_img_1: string;
  coupon_img_2: string;
  coupon_img_3: string;
  coupon_img_4: string;
  coupon_img_5: string;
  pin_file_name: string;
  created: string;
  created_by_name: string;
  created_by_mail: string;
  updated: string;
  updated_by_name: string;
  updated_by_mail: string;
  pin_count: number;
  used_count: number;
  csv_dl_list: CouponDL[];
  regist_status: number;
  status: number;
}
export interface CouponApi extends ApiInterface {
  response: Coupon;
}

export interface CouponListItem {
  id: number;
  campaign_id: string;
  chain_store_name: string;
  coupon_text: string;
  started: string;
  ended: string;
  img_url_list: string[];
  pin_count: number;
  used_count: number;
  status: number;
}
export interface CouponList {
  total: number;
  coupon_list: Array<CouponListItem | null>;
}
export interface CouponListApi extends ApiInterface {
  params: {
    chain_store_name?: string;
    coupon_text?: string;
    campaign_id?: string;
    page?: number;
  };
  response: CouponList;
}
