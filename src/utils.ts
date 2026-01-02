
import fs from 'fs';
import path from 'path';
import { Component as ComponentType } from '@/types';

export const getComponents = (pFolder: string) => {
    const componentsDir = path.join(process.cwd(), 'public', 'components', pFolder);
    const componentFolders = fs.readdirSync(componentsDir);
    const comps: ComponentType[] = componentFolders.map(folder => {
      const folderPath = path.join(componentsDir, folder);
      const summaryPath = path.join(folderPath, 'summary.txt');
      const titlePath = path.join(folderPath, 'title.txt');
      const imagePath = `/components/${pFolder}/${folder}/title.jpg`;
      const descriptionPath = path.join(folderPath, 'description.txt');

      const id = folder;
      let summary = '';
      let title = '';
      let description = '';
      let imagesUrls: string[] = [];

      try {
        summary = fs.readFileSync(summaryPath, 'utf-8').trim();
      } catch (err) {
        console.error(`Error reading summary for ${folder}:`, err);
      }

      try {
        title = fs.readFileSync(titlePath, 'utf-8').trim();
      } catch (err) {
        console.error(`Error reading title for ${folder}:`, err);
      }

      try {
        description = fs.readFileSync(descriptionPath, 'utf-8').trim();
      } catch (err) {
        console.error(`Error reading description for ${folder}:`, err);
      }

       const imageFiles = fs.readdirSync(folderPath).filter(file => !file.includes('title.jpg') && (file.endsWith('.jpg') || file.endsWith('.png')));

       imagesUrls = imageFiles.map(file => `/components/${pFolder}/${folder}/${file}`);

      return {
        id,
        title,
        summary,
        description,
        titleImageUrl: imagePath,
        imagesUrls,
      };
    });
    return comps;
 }

 export const getNews = () => {
    //get news from /public/data/news.txt
    let news = '';

    const dir = path.join(process.cwd(), 
    'public', 'data', 'news.txt');

      try {
        news = fs.readFileSync(dir, 'utf-8').trim();
        console.log('News:', news);
      } catch (err) {
        console.error(`Error reading description for ${dir}:`, err);
      }
      return news.split('\n');
}

