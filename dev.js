import { build, preview } from 'vite';

/**
 * Cross-Platform Development Server for Vayyy Portfolio
 *
 * Solves URL fragment parsing issues when project directories contain special
 * characters (e.g. '#' on Windows) by using Vite's programmatic compiler with
 * active file watching and preview server on localhost:3000.
 */
async function startDevelopmentServer() {
  console.log('\n🚀 [Vayyy Portfolio] Initializing development environment...\n');

  try {
    // 1. Compile fresh production bundle
    await build();

    // 2. Enable continuous file watching in background
    await build({
      build: {
        watch: {}
      }
    });

    // 3. Launch local preview server on port 3000
    const server = await preview({
      preview: {
        port: 3000,
        host: true,
        open: false
      }
    });

    console.log('\n======================================================');
    console.log(' ✨ Vayyy Portfolio Development Server Ready! ');
    console.log('======================================================\n');
    server.printUrls();
    console.log('\n 👀 Watching for file changes in src/ and style.css...\n');
  } catch (err) {
    console.error('❌ Failed to start development server:', err);
    process.exit(1);
  }
}

startDevelopmentServer();
