import { revalidateTag } from 'next/cache';

export function revalidateAllTags(tags: string[]) {
  tags.forEach((tag) => {
    revalidateTag(tag);
  });
}
