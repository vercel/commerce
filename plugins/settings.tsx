// @ts-nocheck

/**
 * This plugin contains all the logic for setting up the singletons
 */

import { type DocumentDefinition } from 'sanity';
import { Iframe } from 'sanity-plugin-iframe-pane';
import { ListItemBuilder, type StructureResolver } from 'sanity/desk';

import { iframeOptions, PREVIEWABLE_DOCUMENT_TYPES } from '../sanity.config';

const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId();

  if (!id) {
    return false;
  }

  return ![
    // 'category',
    // 'home',
    'media.tag',
    // 'page',
    // 'product',
    // 'settings',
    // 'blurb',
    // 'section',
    // 'usp',
    'navigation',
    'footerMenu',
    'utilityMenu'
  ].includes(id);
};

export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Home)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter((templateItem) => !types.includes(templateItem.templateId));
        }

        return prev;
      },
      // Removes the "duplicate" action on the Singletons (such as Home)
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== 'duplicate');
        }

        return prev;
      }
    }
  };
};

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (typeDefArray: DocumentDefinition[]): StructureResolver => {
  return (S) => {
    // Goes through all of the singletons that were provided and translates them into something the
    // Desktool can understand
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title)
        .icon(typeDef.icon)
        .child(
          S.documentList()
            .title(typeDef.name)
            .filter(`_type == "${typeDef.name}"`)
            .child((id = typeDef.name) =>
              S.document()
                .schemaType(typeDef.name)
                .id(id)
                .views([
                  S.view.form(),
                  // Preview
                  ...(PREVIEWABLE_DOCUMENT_TYPES.includes(typeDef.name as any)
                    ? [S.view.component(Iframe).options(iframeOptions).title('Preview')]
                    : [])
                ])
            )
        );
    });

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems()
      .filter((listItem) => !typeDefArray.find((singleton) => singleton.name === listItem.getId()))
      .filter(hiddenDocTypes);

    return S.list()
      .title('Content')
      .items([...singletonItems, S.divider(), ...defaultListItems]);
  };
};
