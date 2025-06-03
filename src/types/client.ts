export interface ClientPhoto {
  alt: string;
  image: {
    url: string;
  };
}

export interface Client {
  id: number;
  name: string;
  position: string;
  paragraph: string;
  photo: ClientPhoto;
}

export interface ClientResponse {
  data: Client[];
}

export interface CarouselResponsive {
  superLargeDesktop: {
    breakpoint: { max: number; min: number };
    items: number;
  };
  desktop: {
    breakpoint: { max: number; min: number };
    items: number;
  };
  tablet: {
    breakpoint: { max: number; min: number };
    items: number;
  };
  mobile: {
    breakpoint: { max: number; min: number };
    items: number;
  };
}
