'use client';

import chatOperations, { IStory } from 'operations/chatOperations';
import imageOperations from 'operations/imageOperations';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

export interface IGenerateStoryContext {
  story?: IStory;
  titleImage?: string;
  loading: boolean;
}

const GenerateStoryContext = createContext<IGenerateStoryContext>({
  story: undefined,
  titleImage: undefined,
  loading: false
});

function GenerateStoryContextProvider({ children }: { children: PropsWithChildren<any> }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [story, setStory] = useState<IStory>();
  const [titleImage, setTitleImage] = useState<string>();

  // TODO (Patricio->Benson): should we memoize the titleImage like this? It takes the image a second to come back from the API...
  const value = useMemo<IGenerateStoryContext>(
    () => ({ story, titleImage, loading }),
    [story, titleImage, loading]
  );

  /*
  TODO(Benson -> Patricio): Write a helper function in this directory /generate/utils.ts
  called mergeImages(story: IStory, images: string[]): IStory;
  */

  /*
  TODO(Patricio -> Benson): This Dalle call takes a while to come back. We should probably show a loading indicator in the meantime? We'll figure it out
  */
  const getStoryAsync = useCallback(async () => {
    setLoading(true);
    const story = await chatOperations.createStoryAsync();
    const titleImage = await imageOperations.createImageAsync(story.introduction);
    setTitleImage(titleImage);
    setStory(story);
    setLoading(false);
  }, []);

  return (
    <GenerateStoryContext.Provider value={value}>
      <>
        <button
          onClick={getStoryAsync}
          className="absolute right-24 top-5 z-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Run A New Story
        </button>
        {typeof children === 'function' ? children(value) : children}
      </>
    </GenerateStoryContext.Provider>
  );
}

export const useGenerateStoryContext = (): IGenerateStoryContext =>
  useContext(GenerateStoryContext);

export default GenerateStoryContextProvider;
