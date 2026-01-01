export interface Info {
  masjidName: string;
  address: string;
  googleMapsUrl: string;
  contact: {
    phone: string;
    email: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      instagram: string;
    };
  };
  usefulLinks: {
    title: string;
    url: string;
  }[];
}

export interface Notice {
  message: string;
}

export interface Component {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}
