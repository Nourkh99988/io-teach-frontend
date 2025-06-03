export interface SliderPhoto {
  alt: string;
  image: {
    url: string;
  };
}

export interface SliderData {
  id: number;
  title: string;
  description: string;
  link: string;
  photo: SliderPhoto;
}

export interface SliderResponse {
  data: SliderData[];
}
