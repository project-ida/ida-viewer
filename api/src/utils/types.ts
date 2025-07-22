// Attributes from config files, not public facing
export interface ConfigFile {
  type: 'image' | 'collection';
  absolutePath: string;
  data: {
    image?: ImageConfigData;
    collection?: CollectionConfigData;
    access?: AccessConfigData;
  };
}
export interface ImageConfigData {
  title: string;
  description?: string;
}
export interface CollectionConfigData {
  title: string;
  description?: string;
}
export interface AccessConfigData {
  owner?: string;
}

// Data transfer object (DTO) types to be sent to the client
export interface ConfigOverviewDTO {
  collections: CollectionDTO[];
  orphanImages: ImageSummaryDTO[];
}
export interface CollectionDTO {
  title: string;
  description?: string;
  images: ImageSummaryDTO[];
}
export interface ImageSummaryDTO {
  title: string;
  description?: string;
  encodedPath: string;
}
