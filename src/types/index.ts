export type Toilet = {
  adresse: string;
  type: string;
  status: string;
  lastCleaned: string;
};

export type Wifi = {
  etat2?: string;
  nom_site: string;
  arc_adresse: string;
  cp?: string;
  idpw: string;
  nombre_de_borne_wifi: number;
  url_fiche_equipement?: string;
  pointData: {
    geo_point_2d: {
      lat: number;
      lon: number;
    };
  };
};
