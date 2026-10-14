/**
 * Photography slots. No licensed or owned photography has been supplied yet, so every slot is null
 * and pages fall back to the botanical line illustration.
 *
 * To add a photo: place the files in /public/images, then set the slot, e.g.
 *   hero: { src: '/images/hero-1200.jpg', srcSet: '/images/hero-800.jpg 800w, /images/hero-1200.jpg 1200w',
 *           width: 1200, height: 1500, alt: 'Describe what is actually in the photograph' }
 * Only use photographs Kaayra owns or has licensed. Do not use photographs that imply a finished product.
 */
export interface Photo {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
}

export const photos: Record<'hero' | 'story' | 'approach' | 'development', Photo | null> = {
  hero: null,
  story: null,
  approach: null,
  development: null,
};
