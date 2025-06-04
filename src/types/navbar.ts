export interface Service {
  id: number;
  title: string;
  description: string;
  slug: string;
}

export interface Services {
  services: Service[];
}

export interface ServiceResponse {
  data: Service[];
}

// export interface NavbarProps {
//   // يمكن إضافة props مستقبلاً
// }
