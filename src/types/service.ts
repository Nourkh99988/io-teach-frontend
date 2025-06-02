export interface ServiceSection {
  id: number;
  title: string;
  content: string;
  bulletPoints?: string[];
}

export interface Service {
  id: number;
  attributes: {
    title: string;
    description: string;
    sections: ServiceSection[];
    footer: string;
    locale: string;
    createdAt: string;
    updatedAt: string;
  };
}
