git /**
 * Image Optimization Script
 * Converts PNG/JPG to WebP and GIF to MP4
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Requirements:
 * - npm install sharp
 * - ffmpeg (for GIF to MP4 conversion)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_DIR = path.join(__dirname, '../public/images-optimized');

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function convertToWebP(inputPath, outputPath) {
  try {
    const sharp = require('sharp');
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)`);
    
    return { original: originalSize, optimized: newSize };
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}: ${error.message}`);
    return null;
  }
}

async function convertGifToMp4(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    // Check if ffmpeg is available
    try {
      execSync('ffmpeg -version', { stdio: 'ignore' });
    } catch {
      console.log(`⚠️  ffmpeg not found. Skipping GIF conversion for ${path.basename(inputPath)}`);
      console.log('   Install ffmpeg to convert GIFs to MP4');
      return null;
    }
    
    // Convert GIF to MP4 with good compression
    execSync(`ffmpeg -i "${inputPath}" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -y "${outputPath}"`, {
      stdio: 'ignore'
    });
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savings}% smaller)`);
    
    return { original: originalSize, optimized: newSize };
  } catch (error) {
    console.error(`❌ Failed to convert ${inputPath}: ${error.message}`);
    return null;
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  console.log(`Input:  ${IMAGES_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);
  
  const files = fs.readdirSync(IMAGES_DIR);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  // Process images
  const imageFiles = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  const gifFiles = files.filter(f => /\.gif$/i.test(f));
  
  console.log('📷 Converting images to WebP...\n');
  
  for (const file of imageFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const outputPath = path.join(OUTPUT_DIR, outputName);
    
    const result = await convertToWebP(inputPath, outputPath);
    if (result) {
      totalOriginal += result.original;
      totalOptimized += result.optimized;
    }
  }
  
  console.log('\n🎬 Converting GIFs to MP4...\n');
  
  for (const file of gifFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputName = file.replace(/\.gif$/i, '.mp4');
    const outputPath = path.join(OUTPUT_DIR, outputName);
    
    const result = await convertGifToMp4(inputPath, outputPath);
    if (result) {
      totalOriginal += result.original;
      totalOptimized += result.optimized;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  console.log(`   Original total:  ${formatBytes(totalOriginal)}`);
  console.log(`   Optimized total: ${formatBytes(totalOptimized)}`);
  console.log(`   Total savings:   ${formatBytes(totalOriginal - totalOptimized)} (${((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1)}%)`);
  console.log('\n✨ Done! Optimized images saved to: public/images-optimized/');
  console.log('\n📝 Next steps:');
  console.log('   1. Review optimized images in public/images-optimized/');
  console.log('   2. If satisfied, replace original images');
  console.log('   3. Update data.ts to use .webp and .mp4 extensions');
}

main().catch(console.error);

