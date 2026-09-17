import React from 'react';
import FolderTabCard from './FolderTabCard';

export const folderTabCardPrompt = `A tactile modern UI card with an asymmetrical folder-tab cutout sheet:
- Top portion features an ethereal animated mesh aurora gradient in brand lavender palette.
- Translucent frosted glass circular action button with diagonal arrow in the top right.
- Distinctive folder tab cutout silhouette with rounded convex and concave fillets.
- Category heading "Designs" and subtitle "Web & App Designs" placed inside the raised left tab.
- Bottom metrics row displaying prominent "04 Tags" counter and "1012 Shots" badge.
- Interactive 3D mouse tilt physics and fluid multi-blob gradient mesh animation.
- Seamless Dark Mode (obsidian card with luminous lavender aurora) and Light Mode (crisp ceramic surface with pastel lavender-peach glow).`;

export default function FolderTabCardShowcase() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
      <FolderTabCard
        title="Designs"
        subtitle="Web & App Designs"
        tagsCount="04"
        tagsLabel="Tags"
        shotsCount="1012 Shots"
      />

      <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Click arrow to explore design
      </p>
    </div>
  );
}

FolderTabCardShowcase.customTitle = 'Folder Tab Card';
FolderTabCardShowcase.customSlug = 'folder-tab-card';
