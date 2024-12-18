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
      watch: {
        usePolling: true
      }
    }
  }