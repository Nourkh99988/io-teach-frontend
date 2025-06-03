export interface TeamMemberPhoto {
  id: number;
  alt: string;
  image: {
    id: number;
    documentId: string;
    url: string;
  };
}

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  postion: string;
  photo: TeamMemberPhoto;
}

export interface TeamResponse {
  data: TeamMember[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
