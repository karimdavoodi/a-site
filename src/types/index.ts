export interface Info {
  masjidName: string;
  masjidSlogan: string;
  googleMapsUrl: string;
  prayerTimeUrl: string;
  noticeMessage: string;
  contact: {
    phone: string[];
    address: string;
    email: string;
    socialMedia: {
      facebook: string;
      instagram: string;
      x: string;
      youtube: string;
      tiktok: string;
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
  id?: string;
  title: string;
  titleImageUrl: string;
  summary: string;
  description: string;
  imagesUrls: string[];
}
