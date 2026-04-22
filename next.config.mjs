
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack:(config,{isServer})=>{
        config.resolve.fallback = {
      ...config.resolve.fallback, 
      encoding: false, 
    };
        return config
    }
};

export default nextConfig;
