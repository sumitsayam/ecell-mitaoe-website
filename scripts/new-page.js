#!/usr/bin/env node

/**
 * Scaffolding generator for E-Cell MITAOE
 * Usage: npm run new:page <route-name>
 * Example: npm run new:page incubators
 */

const fs = require('fs');
const path = require('path');

const pageName = process.argv[2];

if (!pageName) {
  console.error('❌ Please specify a page/route name.');
  console.log('Usage: npm run new:page <name>');
  console.log('Example: npm run new:page incubators');
  process.exit(1);
}

const cleanName = pageName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
const capitalized = cleanName
  .split('-')
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('');

const rootDir = path.resolve(__dirname, '..');

// 1. Create content stub: src/content/<name>.ts
const contentDir = path.join(rootDir, 'src', 'content');
if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });
const contentPath = path.join(contentDir, `${cleanName}.ts`);
if (!fs.existsSync(contentPath)) {
  const contentStub = `export interface ${capitalized}Item {
  id: string;
  title: string;
  description: string;
  slug: string;
}

export const ${cleanName}Data: ${capitalized}Item[] = [
  {
    id: '1',
    title: 'Sample ${capitalized}',
    description: 'Detailed description for ${capitalized} section (TODO: Supply verified institutional data)',
    slug: 'sample-${cleanName}',
  },
];
`;
  fs.writeFileSync(contentPath, contentStub, 'utf8');
  console.log(`✅ Created content stub: src/content/${cleanName}.ts`);
}

// 2. Create feature module: src/features/<name>/index.ts
const featureDir = path.join(rootDir, 'src', 'features', cleanName);
if (!fs.existsSync(featureDir)) fs.mkdirSync(featureDir, { recursive: true });
const featurePath = path.join(featureDir, 'index.ts');
if (!fs.existsSync(featurePath)) {
  const featureStub = `import React from 'react';
import { ${cleanName}Data } from '@/content/${cleanName}';

export function ${capitalized}FeatureView() {
  return (
    <section className="py-16 sm:py-24 bg-white text-[#102A56]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-primary mb-6">
          ${capitalized}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {${cleanName}Data.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl border border-borderToken bg-[#F7F9FF]">
              <h3 className="text-lg font-bold font-display text-[#102A56] mb-2">{item.title}</h3>
              <p className="text-sm text-body leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
`;
  fs.writeFileSync(featurePath, featureStub, 'utf8');
  console.log(`✅ Created feature module: src/features/${cleanName}/index.ts`);
}

// 3. Create route page: src/app/<name>/page.tsx
const appPageDir = path.join(rootDir, 'src', 'app', cleanName);
if (!fs.existsSync(appPageDir)) fs.mkdirSync(appPageDir, { recursive: true });
const appPagePath = path.join(appPageDir, 'page.tsx');
if (!fs.existsSync(appPagePath)) {
  const pageStub = `import type { Metadata } from 'next';
import { ${capitalized}FeatureView } from '@/features/${cleanName}';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: '${capitalized} — E-Cell MITAOE',
  description: 'Official ${capitalized} program from the Entrepreneurship Cell at MIT Academy of Engineering, Pune.',
};

export default function ${capitalized}Page() {
  return (
    <main className="min-h-screen bg-white text-[#102A56] flex flex-col justify-between">
      <Navbar />
      <div className="flex-1">
        <${capitalized}FeatureView />
      </div>
      <Footer />
    </main>
  );
}
`;
  fs.writeFileSync(appPagePath, pageStub, 'utf8');
  console.log(`✅ Created route page: src/app/${cleanName}/page.tsx`);
}

console.log(`🎉 Page scaffolding complete for /${cleanName}!`);
