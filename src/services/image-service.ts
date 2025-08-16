class ImageServiceClassV2 {
  getDefaultImage(type: string) {
    switch (type) {
      case 'place': return '/images/defaults/place.png';
      case 'guide': return '/images/defaults/guide.png';
      case 'zone': return '/images/defaults/zone.png';
      default: return '/images/defaults/default.png';
    }
  }

  getImageWithFallback(type: string, id: number | string, filename?: string, size?: string) {
    if (!filename) return this.getDefaultImage(type);
    // return a normalized path used by the frontend
    return `/images/${type}s/${id}/${filename}`;
  }

  generateImageUrl(type: string, id: number | string, filename?: string, size?: string, format: string = 'jpg') {
    if (!filename) return this.getDefaultImage(type);
    // size/format can be used by future CDN integration
    return `/images/${type}s/${id}/${filename}`;
  }
}

export const ImageService = new ImageServiceClassV2();
export default ImageService;
