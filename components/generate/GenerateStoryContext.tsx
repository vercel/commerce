'use client';

import chatOperations, { IStory } from 'operations/chatOperations';
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
  loading: boolean;
}

const GenerateStoryContext = createContext<IGenerateStoryContext>({
  story: undefined,
  loading: false
});

function GenerateStoryContextProvider({ children }: { children: PropsWithChildren<any> }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [story, setStory] = useState<IStory>();

  const value = useMemo<IGenerateStoryContext>(() => ({ story, loading }), [story, loading]);

  /*
  TODO(Benson -> Patricio): Make network call to get images
  TODO(Benson -> Patricio): Write a helper function in this directory /generate/utils.ts
  called mergeImages(story: IStory, images: string[]): IStory;
  */
  const getStoryAsync = useCallback(async () => {
    setLoading(true);
    const story = await chatOperations.createStoryAsync();
    // const images = await imageOperations.getStoryImagesAsync(story);
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
