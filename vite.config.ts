import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** Make main CSS non-blocking: load with media=print then switch to all (saves ~850ms on mobile). */
function nonBlockingCss() {
  return {
    name: 'non-blocking-css',
    enforce: 'post' as const,
    transformIndexHtml(html: string) {
      return html.replace(
        /<link\s[^>]*href="([^"]*\/assets\/[^"]+\.css)"[^>]*>/gi,
        (match, href) => {
          if (match.includes('media=')) return match
          const nonBlocking = match.replace(/>$/, ' media="print" onload="this.media=\'all\'">')
          return nonBlocking + `<noscript><link rel="stylesheet" href="${href}"></noscript>`
        }
      )
    },
  }
}

export default defineConfig({
  plugins: [
    nonBlockingCss(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'router';
            if (id.includes('react-dom') || id.includes('/react/')) return 'react-vendor';
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('@radix-ui')) return 'radix';
            // motion/framer-motion not split to avoid circular chunk with react-vendor
          }
        },
      },
    },
  },

  server: {
    host: true, // listen on 0.0.0.0 so you can open http://<your-local-ip>:5173 on your phone (same Wi‑Fi)
    allowedHosts: true, // allow ngrok and other tunnel hosts (e.g. vibraculoid-improbably-elfriede.ngrok-free.dev)
  },
})
