# Troubleshooting Guide

**Project:** Belyx Game Hosting Website  
**Last Updated:** March 6, 2026  
**Quick Reference:** Common issues and instant solutions

---

## 🚨 Quick Diagnostics

**Something broken?** Run these commands first:

```bash
# Check build status
npm run build

# Check TypeScript
npm run typecheck

# Check code quality
npm run lint

# Clean and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## 🔥 Common Issues & Solutions

### 1. Build Fails with "module is not defined"

**Symptom:**
```
Error: 'module' is not defined
File: .eslintrc.cjs
```

**Solution:**
```js
// .eslintrc.cjs - Add node: true
module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2022: true,
    node: true  // ← Add this
  },
  // ... rest of config
};
```

**Why:** ESLint doesn't recognize CommonJS syntax without node environment.

---

### 2. Import Path Errors (routes.ts not found)

**Symptom:**
```
Error: Cannot find module './routes'
File: src/app/App.tsx
```

**Solution:**
```tsx
// CORRECT - No file extension
import { router } from "./routes";

// WRONG - Don't include .tsx
import { router } from "./routes.tsx";
```

**Why:** TypeScript resolves extensions automatically with moduleResolution: "Bundler"

---

### 3. White Screen on Production Build

**Symptom:**
- Dev works fine
- Production build shows blank white screen
- No errors in console

**Solution 1 - Check base path:**
```js
// vite.config.ts
export default defineConfig({
  base: '/',  // Change if deploying to subdirectory
});
```

**Solution 2 - Check router basename:**
```tsx
// If deploying to subdirectory like /app
createBrowserRouter(routes, {
  basename: '/app'
});
```

**Solution 3 - Check console for lazy load errors:**
```
Open DevTools > Console
Look for: "Failed to fetch dynamically imported module"
```

**Fix:** Ensure all lazy-loaded components exist and are exported correctly.

---

### 4. Images Not Loading

**Symptom:**
- Images show broken icon
- 404 errors in Network tab

**Solution:**

```tsx
// CORRECT - Use relative paths from public/
<img src="/assets/image.png" alt="..." />

// CORRECT - Import from src/
import logo from './assets/logo.png';
<img src={logo} alt="..." />

// WRONG - Absolute filesystem paths
<img src="C:/Users/..." alt="..." />
```

**Public folder structure:**
```
public/
  assets/
    image.png
  favicon.ico
```

---

### 5. Animations Not Working

**Symptom:**
- Components render but don't animate
- No transition effects

**Solution 1 - Check Framer Motion version:**
```bash
npm list framer-motion
# Should be 12.x or compatible with motion package
```

**Solution 2 - Verify imports:**
```tsx
// CORRECT
import { motion } from "motion/react";

// WRONG
import { motion } from "framer-motion";  // Old import path
```

**Solution 3 - Check CSS is loaded:**
```tsx
// In main.tsx, ensure CSS import is present
import './index.css';
```

---

### 6. TypeScript Errors After npm install

**Symptom:**
```
Error: Cannot find type definition for 'react'
```

**Solution:**
```bash
# Reinstall type definitions
npm install --save-dev @types/react @types/react-dom

# Clear TypeScript cache
rm -rf node_modules/.cache

# Restart TypeScript server (in VS Code)
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

### 7. ESLint Warnings About "any"

**Symptom:**
```
Warning: Unexpected any. Specify a different type.
```

**Solution (Quick fix):**
```tsx
// Option 1: Use proper type
const data: MyType = ...;

// Option 2: Use unknown (safer than any)
const data: unknown = ...;

// Option 3: Disable for specific line
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = ...;
```

**Solution (Project-wide):**
```js
// .eslintrc.cjs - Already set to "warn"
rules: {
  "@typescript-eslint/no-explicit-any": "warn",  // Not "error"
}
```

---

### 8. Dev Server Won't Start

**Symptom:**
```
Error: Port 5173 is already in use
```

**Solution:**

```bash
# Option 1: Kill the process
# Windows:
netstat -ano | findstr :5173
taskkill /PID [number] /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Option 2: Use different port
npm run dev -- --port 3000
```

**Symptom:**
```
Error: Cannot find module 'vite'
```

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### 9. Cart Items Not Persisting

**Symptom:**
- Add items to cart
- Refresh page
- Cart is empty

**Solution:**
```tsx
// Verify localStorage is working
console.log(localStorage.getItem('belyx_cart'));

// Check if localStorage is blocked (incognito mode)
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
} catch (e) {
  console.error('localStorage blocked');
}
```

**Browser Issue:**
- Private/Incognito mode may block localStorage
- Check browser settings

---

### 10. Checkout Form Not Submitting

**Symptom:**
- Click "Complete Purchase"
- Nothing happens

**Solution:**

**Check 1 - Validation errors:**
```tsx
// Open DevTools Console
// Look for validation error messages
```

**Check 2 - Button disabled state:**
```tsx
// Verify isProcessing state
console.log('isProcessing:', isProcessing);
```

**Check 3 - Cart is not empty:**
```tsx
// Verify cartItems
console.log('cartItems:', localStorage.getItem('belyx_cart'));
```

---

### 11. Globe Component Not Rendering

**Symptom:**
- Spinning loader forever
- Globe never appears

**Solution:**

**Check 1 - WebGL support:**
```javascript
// Run in console
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
console.log('WebGL supported:', !!gl);
```

**Check 2 - Three.js loaded:**
```tsx
// Check if error in console
import * as THREE from 'three';
console.log('THREE:', THREE);
```

**Check 3 - Component exported correctly:**
```tsx
// InteractiveGlobe.tsx
export default function InteractiveGlobe() {
  // Must be default export for lazy loading
}
```

---

### 12. Styles Not Applied

**Symptom:**
- Components render but look unstyled
- Colors wrong or missing

**Solution:**

**Check 1 - Tailwind CSS:**
```css
/* In index.css or App.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Check 2 - PostCSS config:**
```js
// postcss.config.mjs must exist
export default {
  plugins: {
    '@tailwindcss/vite': {},
  },
};
```

**Check 3 - CSS import:**
```tsx
// In main.tsx
import './index.css';  // Must be imported
```

---

### 13. Deployment Fails

**Symptom (Vercel/Netlify):**
```
Build failed: Command "npm run build" exited with 1
```

**Solution:**

**Check 1 - Node version:**
```json
// package.json - Add engines
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Check 2 - Build command:**
```
Build command: npm run build
Output directory: dist
```

**Check 3 - Environment variables:**
- Check if any required env vars are missing
- Add them in deployment platform settings

**Check 4 - Install command:**
```
Install: npm ci
# or
Install: npm install --legacy-peer-deps
```

---

### 14. Performance Issues / Slow Load

**Symptom:**
- Page takes 5+ seconds to load
- Laggy animations

**Quick Fixes:**

**1. Check bundle size:**
```bash
npm run build
# Look for files > 1 MB
```

**2. Verify lazy loading:**
```tsx
// All pages should use lazy()
const Home = lazy(() => import('./pages/Home'));
```

**3. Check image sizes:**
```bash
ls -lh public/assets/*.png
# Files > 500 KB need optimization
```

**4. Disable animations temporarily:**
```css
/* Add to test if animations are the issue */
* {
  animation: none !important;
  transition: none !important;
}
```

**Solution:** See `PERFORMANCE_OPTIMIZATION.md` for detailed fixes.

---

### 15. Tests Failing

**Symptom:**
```
Error: pathRef.current?.getTotalLength is not a function
```

**Solution:**
This is a test environment issue, not a code bug.

**Mock the missing APIs:**
```ts
// vitest.setup.ts
global.SVGPathElement.prototype.getTotalLength = () => 100;
```

**Or skip animation tests:**
```tsx
// In test file
test.skip('animation test', () => {
  // Test that uses SVG animations
});
```

**Reality:** The actual code works fine in browsers. Tests need better mocking.

---

## 🛠️ Debug Tools

### Check What's Running

```bash
# Check if dev server is running
curl http://localhost:5173

# Check process on port
# Windows:
netstat -ano | findstr :5173
# Mac/Linux:
lsof -i :5173
```

### Clear All Caches

```bash
# Clear node_modules
rm -rf node_modules

# Clear package lock
rm package-lock.json

# Clear build output
rm -rf dist

# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall
npm install
```

### Verify Environment

```bash
# Check versions
node --version   # Should be 18+
npm --version    # Should be 8+

# Check project structure
ls -la src/app/
ls -la public/

# Check git status
git status
```

---

## 🔍 Debugging Techniques

### 1. Component Not Rendering?

```tsx
// Add console logs
function MyComponent() {
  console.log('MyComponent rendering');
  return <div>Content</div>;
}
```

### 2. Props Not Passing?

```tsx
// Log props
function ChildComponent(props) {
  console.log('ChildComponent props:', props);
  return <div>{props.value}</div>;
}
```

### 3. State Not Updating?

```tsx
const [count, setCount] = useState(0);

useEffect(() => {
  console.log('count changed to:', count);
}, [count]);
```

### 4. API Call Failing?

```tsx
fetch('/api/endpoint')
  .then(res => {
    console.log('Response status:', res.status);
    return res.json();
  })
  .then(data => console.log('Data:', data))
  .catch(err => console.error('Error:', err));
```

---

## 📞 Still Stuck?

### Before Asking for Help:

1. ✅ Check this guide
2. ✅ Read error message carefully
3. ✅ Check browser console
4. ✅ Try building from scratch
5. ✅ Check recent git changes

### Include in Your Report:

- Error message (exact text)
- Steps to reproduce
- Browser and OS
- Node version (`node --version`)
- What you've tried
- Console output

### Related Documentation:

- `TEST_REPORT.md` - Full test results
- `PERFORMANCE_OPTIMIZATION.md` - Performance fixes
- `TESTING_SUMMARY.md` - Overview

---

## 🎯 Prevention Tips

### Before Committing Code:

```bash
# Run all checks
npm run typecheck
npm run lint
npm run build

# If all pass, you're good to commit
```

### Before Deploying:

```bash
# Test production build locally
npm run build
npx serve dist

# Open http://localhost:3000
# Test all major features
```

### Regular Maintenance:

```bash
# Update dependencies monthly
npm outdated
npm update

# Check for security issues
npm audit
npm audit fix
```

---

**Version:** 1.0  
**Last Updated:** March 6, 2026  
**Next Review:** After first production deployment