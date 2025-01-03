export type Meta_Data = {
  id: number;
  key: string;
  value: string;
};

export type Dimension = {
  length: string;
  width: string;
  height: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
};

export type Image = {
  id: number;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  src: string;
  name: string;
  alt: string;
};

export type Attribute = {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
};

export type Default_Attribute = {
  id: number;
  name: string;
  slug: string;
  option: string;
};
