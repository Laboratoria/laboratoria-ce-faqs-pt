import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { marked } from 'marked';

let insideUpperSection = false;
let firstUpperSectionPassed = false;
const renderer = {
  heading(originalText, level, _raw, slugger) {
    let template;
    let text = originalText.replace(/\{(.*?)\}/,'')

    if(level == 2) {
      insideUpperSection = true;
      if(!firstUpperSectionPassed) {
        firstUpperSectionPassed = true;
        template = `
        <details class="upper-section">
          <summary id="${slugger.slug(text)}">${text}</summary>`;
      } else {
        template = `
        </details>
        <details class="upper-section">
          <summary id="${slugger.slug(text)}">${text}</summary>`;
      }
    } else {
      template = `
      <h${level} id="${slugger.slug(text)}">
        ${text}
      </h${level}>`;
    }

    return template
  }
};

marked.use({ renderer });

const data = fs.readFileSync(resolve(__dirname,'FAQ.md'), 'utf8');
const styles =  fs.readFileSync(resolve(__dirname, 'style.css'), 'utf8');

const baseHTML = marked(data.toString())

const json = {
  body: baseHTML,
  styles: styles
}
// Clean
// const cleanHTML = baseHTML.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

fs.writeFileSync(
  resolve(__dirname,'..','src/template.json'),
  JSON.stringify(json), 'utf-8')
