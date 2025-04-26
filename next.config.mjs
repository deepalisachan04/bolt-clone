/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  images:{
    domains:['lh3.googleusercontent.com'],
  },
  webpack(config) {
    // Use import.meta.url to resolve the directory
    const dir = path.dirname(new URL(import.meta.url).pathname);
    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(dir),  // Resolves the root directory correctly
    };

    return config;
  },
};

export default nextConfig;
