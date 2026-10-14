import type { Photo } from '../content/images';

interface Props {
  photo: Photo | null;
  /** Shown when no photograph has been supplied. Decorative line illustration. */
  fallback: React.ReactNode;
  caption?: string;
  priority?: boolean;
}

export default function Figure({ photo, fallback, caption, priority }: Props) {
  return (
    <figure style={{ margin: 0 }}>
      <div className="art-frame">
        {photo ? (
          <img
            src={photo.src}
            srcSet={photo.srcSet}
            sizes="(min-width: 62rem) 40vw, 90vw"
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        ) : (
          fallback
        )}
      </div>
      {caption && <figcaption className="art-caption">{caption}</figcaption>}
    </figure>
  );
}
