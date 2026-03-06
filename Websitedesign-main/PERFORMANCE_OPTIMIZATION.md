# Performance Optimization Guide

**Project:** Belyx Game Hosting Website  
**Last Updated:** March 6, 2026  
**Priority Level:** 🔴 HIGH - Implement before launch

---

## Quick Wins (Immediate Impact)

### 1. Image Optimization 🔴 CRITICAL

**Current Issue:** 3 large PNG files (~3 MB total) significantly impact load time.

#### Solution: Convert to WebP

```bash
# Install image optimization tool
npm install --save-dev sharp-cli

# Add to package.json scripts:
"optimize:images": "sharp -i 'public/**/*.png' -o 'public/optimized/' -f webp -q 85"
```

**Expected Impact:** 60-70% size reduction

#### Implementation:

```tsx
// Before:
<img src="/assets/hero-image.png" alt="Hero" />

// After:
<picture>
  <source srcset="/assets/hero-image.webp" type="image/webp" />
  <img src="/assets/hero-image.png" alt="Hero" loading="lazy" />
</picture>
```

#### Responsive Images:

```tsx
<img 
  src="/assets/hero-400.webp"
  srcset="
    /assets/hero-400.webp 400w,
    /assets/hero-800.webp 800w,
    /assets/hero-1200.webp 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Hero"
  loading="lazy"
/>
```

---

## 2. CSS Optimization 🟡 MEDIUM PRIORITY

**Current:** 366 KB CSS (56 KB gzipped)

### Option A: PurgeCSS (Recommended)

```bash
npm install --save-dev @fullhuman/postcss-purgecss
```

```js
// postcss.config.mjs
import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    purgecss({
      content: ['./src/**/*.{tsx,ts,jsx,js}', './index.html'],
      safelist: ['motion-', 'animate-', 'lucide-'],
    }),
  ],
};
```

**Expected Impact:** 30-40% CSS size reduction

### Option B: Critical CSS Extraction

```bash
npm install --save-dev critters
```

```js
// vite.config.ts
import { critters } from 'vite-plugin-critters';

export default defineConfig({
  plugins: [
    critters({
      preload: 'swap',
      preloadFonts: true,
    }),
  ],
});
```

---

## 3. Already Implemented ✅

### Code Splitting
- ✅ All pages lazy-loaded
- ✅ Heavy components (InteractiveGlobe) in separate chunks
- ✅ Route-based splitting active

### Lazy Loading
```tsx
// Current implementation (keep as is):
const InteractiveGlobe = lazy(() => import('./InteractiveGlobe'));
const Home = lazy(() => import('./pages/Home'));
```

---

## 4. Advanced Optimizations 🟢 LOW PRIORITY

### A. Component-Level Code Splitting

```tsx
// Split heavy UI libraries
const ThreeCanvas = lazy(() => import('./ThreeCanvas'));
const HeavyChart = lazy(() => import('./HeavyChart'));

// Use only when needed
<Suspense fallback={<Spinner />}>
  {showChart && <HeavyChart />}
</Suspense>
```

### B. Font Optimization

```html
<!-- In index.html -->
<link 
  rel="preload" 
  href="/fonts/montserrat-variable.woff2" 
  as="font" 
  type="font/woff2" 
  crossorigin 
/>
```

```css
/* Use font-display: swap */
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/montserrat-variable.woff2') format('woff2');
  font-display: swap;
}
```

### C. Preconnect to External Resources

```html
<!-- Add to index.html -->
<link rel="preconnect" href="https://api.example.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

### D. Resource Hints

```tsx
// Preload critical images
<link rel="preload" as="image" href="/hero.webp" />

// Prefetch next page
<link rel="prefetch" href="/games/minecraft" />
```

---

## 5. Runtime Performance

### A. React Performance

```tsx
// Memoize expensive components
import { memo } from 'react';

export const ExpensiveComponent = memo(({ data }) => {
  // Heavy rendering
}, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});
```

```tsx
// useMemo for expensive calculations
const processedData = useMemo(() => {
  return heavyComputation(rawData);
}, [rawData]);
```

### B. Virtualization for Long Lists

```bash
npm install --save react-window
```

```tsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={1000}
  itemSize={50}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>Item {index}</div>
  )}
</FixedSizeList>
```

---

## 6. Network Optimization

### A. Enable Compression (Server-Side)

```nginx
# nginx.conf
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;

# Even better: Brotli
brotli on;
brotli_types text/plain text/css application/json application/javascript;
```

### B. CDN Configuration

```bash
# Cloudflare, Vercel, or Netlify auto-handles this
# Ensure cache headers are set correctly
```

```js
// vite.config.ts - set long cache for assets
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'chunks/[name].[hash].js',
      },
    },
  },
});
```

### C. Service Worker (PWA)

```bash
npm install --save-dev vite-plugin-pwa
```

```js
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,webp,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 300,
              },
            },
          },
        ],
      },
    }),
  ],
});
```

---

## 7. Monitoring & Measurement

### A. Lighthouse CI

```bash
npm install --save-dev @lhci/cli
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "startServerCommand": "npm run build && npx serve dist",
      "url": ["http://localhost:3000/"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["warn", {"minScore": 0.9}]
      }
    }
  }
}
```

```bash
# Run Lighthouse
npx lhci autorun
```

### B. Web Vitals Tracking

```bash
npm install --save web-vitals
```

```tsx
// src/main.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  console.log(metric);
  // Send to your analytics service
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### C. Bundle Analysis

```bash
npm install --save-dev rollup-plugin-visualizer
```

```js
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

---

## 8. Implementation Priority

### Phase 1: Before Launch 🔴
1. ✅ Lazy loading (DONE)
2. ✅ Code splitting (DONE)
3. 🔴 Image optimization (DO NOW)
4. 🔴 Add loading="lazy" to images
5. 🔴 Convert PNGs to WebP

### Phase 2: Week 1 🟡
6. 🟡 CSS optimization (PurgeCSS)
7. 🟡 Font optimization
8. 🟡 Enable compression
9. 🟡 Set up CDN

### Phase 3: Month 1 🟢
10. 🟢 Implement PWA
11. 🟢 Add component memoization
12. 🟢 Set up monitoring
13. 🟢 Lighthouse CI in pipeline

---

## 9. Quick Reference

### Current Performance Stats

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| Initial JS | 463 KB (155 KB gz) | <200 KB | 🟡 OK |
| CSS | 366 KB (57 KB gz) | <50 KB | 🟡 OK |
| Images | ~3 MB | <500 KB | 🔴 BAD |
| Load Time | ~3-5s | <2s | 🟡 OK |
| FCP | Unknown | <1.8s | ⚪ TBD |
| LCP | Unknown | <2.5s | ⚪ TBD |

### Target Lighthouse Scores (After Optimization)

- Performance: 90+ 🎯
- Accessibility: 95+ 🎯
- Best Practices: 100 🎯
- SEO: 95+ 🎯

---

## 10. Testing Optimizations

```bash
# 1. Build for production
npm run build

# 2. Serve locally
npx serve dist -p 3000

# 3. Open Chrome DevTools
# - Network tab: Check sizes
# - Lighthouse tab: Run audit
# - Performance tab: Record load

# 4. Compare before/after
# - Take screenshots
# - Document metrics
```

---

## Conclusion

**Priority Actions:**
1. 🔴 Optimize images (60% file size reduction expected)
2. 🟡 Add lazy loading attributes
3. 🟡 Enable server compression
4. 🟢 Set up monitoring

**Expected Overall Improvement:**
- Load time: -40%
- Initial bundle: -30%
- Lighthouse score: 75 → 95

---

**Next Steps:**
1. Run `npm run optimize:images` (after setting up)
2. Update image references to use WebP
3. Deploy to staging
4. Run Lighthouse audit
5. Compare metrics
6. Deploy to production

**Questions?** Check the TEST_REPORT.md for detailed analysis.