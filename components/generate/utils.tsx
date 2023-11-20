import { IStory } from 'operations/chatOperations';

//TODO (Patricio/Benson): make decision: should this create image for each page item? or for whole story? should it be called in context or in component? I ask this bc we need different images for title and for each page, with different formatting inside of the myDocument...
function mergeImages(story: IStory, titleImage: string): IStory {
  return {
    ...story,
    titleImage
  };
}

export default mergeImages;
