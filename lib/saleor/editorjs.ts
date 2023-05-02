import { invariant } from './utils';

type EditorJsHeaderBlock = {
  type: 'header';
  data: { text: string; level: 1 | 2 | 3 | 4 | 5 | 6 };
};
type EditorJsParagraphBlock = { type: 'paragraph'; data: { text: string } };
type EditorJsListBlock = {
  type: 'list';
  data: { style: 'unordered' | 'ordered'; items: string[] };
};

type EditorJsBlockCommon = { id: string };
type EditorJsBlocks = EditorJsHeaderBlock | EditorJsParagraphBlock | EditorJsListBlock;

type EditorJsBlock = EditorJsBlocks & EditorJsBlockCommon;

interface EditorJsResponse {
  blocks: readonly EditorJsBlock[];
  time: number;
  version: string;
}

const parseEditorJson = (content: string): EditorJsResponse | null => {
  try {
    const data: EditorJsResponse = JSON.parse(content);
    // manually validate it has more or less proper shape
    invariant(data && 'blocks' in data, `Invalid shape`);
    invariant(Array.isArray(data.blocks), `Invalid shape`);
    invariant(
      data.blocks.every((item) => 'type' in item && 'data' in item),
      `Invalid shape`
    );
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const parseEditorJsToHtml = (content: string) => {
  const data = parseEditorJson(content);
  if (!data) {
    return '';
  }

  const html = data.blocks
    .map((block) => {
      switch (block.type) {
        case 'header':
          return header(block.data);
        case 'list':
          return list(block.data);
        case 'paragraph':
          return paragraph(block.data);
        default:
          console.warn(`Unknown block type: ${JSON.stringify(block)}`);
          return '';
      }
    })
    .join('');

  return html;
};

function list(data: EditorJsListBlock['data']): string {
  const el = data.style === 'ordered' ? 'ul' : 'ol';
  const items = data.items.map((item) => `<li>${item}</li>`).join('');
  return `<${el}>${items}</${el}>`;
}

function paragraph({ text }: EditorJsParagraphBlock['data']): string {
  return `<p>${text}</p>`;
}

function header({ level, text }: EditorJsHeaderBlock['data']): string {
  return `<h${level}>${text}</h${level}>`;
}
