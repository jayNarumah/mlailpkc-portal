
export interface MenuResource {
  id: number;
  title: string;
  link: string;
  order: string;
  is_active: boolean;
  icon: string;
  parent_id?: number;
  module_id?: number;
}


export interface UpdateMenuDto {

  title: string;
  link: string;
  order: string;
  is_active: boolean;
  icon: string;
  parent_id: number;
  module_id: number;

}
