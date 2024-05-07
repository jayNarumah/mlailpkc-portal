export interface DashboardSettingResource {
  chart_id: number;
  module_id: number;
  chart_type_id: number;
  chart_category_id: number;
  chart_title: string;
  is_active: boolean;
  orderby: number;
  is_group: boolean;
  sub_module_id: number
}
