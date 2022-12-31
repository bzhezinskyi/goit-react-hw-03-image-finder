import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ GalleryList }) {
  return (
    <ul className="ImageGallery">
      {GalleryList.map(galleryItem => {
        return (
          <ImageGalleryItem key={galleryItem.id} galleryItem={galleryItem} />
        );
      })}
    </ul>
  );
}
