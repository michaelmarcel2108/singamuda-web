export interface SiteSettings {
  logoUrl: string;
  bgHero: string;
  imgStory: string;
  imgRoastery: string;
}

export interface CoffeeMenu {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface RoasteryProduct {
  id: string;
  name: string;
  weight: string;
  price: string;
  description: string;
  image: string;
}

export interface BestSeller {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}
