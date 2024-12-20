module.exports = {
    root: './src',
    build: {
      outDir: '../out',
      emptyOutDir: true, // also necessary
      commonjsOptions: {
        include: ["/node_modules/"]
      }
    },
    server: {
      optimizeDeps: {
        include: ['./out'],
      },
      watch: {
        usePolling: true,
      }
    }
  }
