import { ImageList, ImageListItem } from "@mui/material";

export const ImageGallery = ({ images = [] }) => {

  return ( 
    <ImageList variant="masonry" cols={3} gap={8}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            srcSet={`${image}`}
            src={`${image}`}
            alt={image}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
   );
}
 