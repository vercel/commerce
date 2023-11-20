import { IStory } from 'operations/chatOperations';

function mergeImages(story: IStory, titleImage: string): IStory {
  return {
    ...story,
    titleImage
  };
}

export default mergeImages;
