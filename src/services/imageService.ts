class ImageServiceClass {
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
		return `/images/${type}s/${id}/${filename}`;
	}

		generateImageUrl(type: string, id: number | string, filename?: string, size?: string, format: string = 'jpg') {
			return this.getImageWithFallback(type, id, filename, size);
		}
}

const ImageService = new ImageServiceClass();
export { ImageService };
export default ImageService;

