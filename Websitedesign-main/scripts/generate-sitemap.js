import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://belyxhost.com';

// This would ideally fetch from your CMS or Database
const games = [
  { id: 'Minecraft', name: 'Minecraft', img: '/assets/minecraft.png' },
  { id: 'Rust', name: 'Rust', img: '/assets/Rust-Logo.jpg' },
  { id: 'ARK', name: 'Ark: SE', img: '/assets/ark.png' },
  { id: 'Valheim', name: 'Valheim', img: '/assets/valheim-logo.png' },
  { id: 'GarrysMod', name: 'Garry\'s Mod', img: '/assets/garrysmod.png' },
  { id: 'CS2', name: 'CS:GO', img: '/assets/csgo.png' },
];

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

  games.forEach(game => {
    xml += `
  <url>
    <loc>${BASE_URL}/games/${game.id}</loc>
    <image:image>
      <image:loc>${BASE_URL}${game.img}</image:loc>
      <image:title>${game.name} Server Hosting</image:title>
      <image:caption>High-performance ${game.name} server hosting at BelyxHost</image:caption>
      <image:license>https://belyxhost.com/terms</image:license>
    </image:image>
  </url>`;
  });

  xml += `
</urlset>`;

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap();
