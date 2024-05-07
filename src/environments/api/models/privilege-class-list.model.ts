export interface PrivilegeClassListResource {
  id: number;
  name: string;
}
export interface PrivilegeDetailPostModel {
  // id: number;
  privilege_id: number;
  privilege_class_id: number;
  user_list: Array<number>;
}

// create privilege class
export interface PrivilegeClassDto {
  name: string;
}

export interface Privilege {
  id: number;
  name: string;
}
