export default function ImageGalleryItem({
  galleryItem: { webformatURL, tags },
}) {
  return (
    <li className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
}
