'use client';

import chatOperations, { IStory } from 'operations/chatOperations';
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

export interface IGenerateStoryContext {
  story?: IStory;
  images: string[];
  loading: boolean;
}

const GenerateStoryContext = createContext<IGenerateStoryContext>({
  story: undefined,
  images: [],
  loading: false
});

function GenerateStoryContextProvider({ children }: { children: PropsWithChildren<any> }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [story, setStory] = useState<IStory>();
  /*
   Note(Benson): For now images is an array of urls where each index in the array
   corresponds to the page number. 
   i.e., index 0 could be title, index 1 is the first page in pages, etc.
   */
  const [images, setImages] = useState<string[]>([]);

  const value = useMemo<IGenerateStoryContext>(
    () => ({ story, images, loading }),
    [story, images, loading]
  );

  return (
    <GenerateStoryContext.Provider value={value}>
      <>
        <button
          onClick={async () => {
            setLoading(true);
            const story = await chatOperations.createStoryAsync();
            setStory(story);
            setLoading(false);
          }}
          className="mb-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
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
