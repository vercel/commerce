'use client';

import { IStory } from 'operations/chatOperations';
import { PropsWithChildren, createContext, useContext, useMemo, useState } from 'react';

export interface IGenerateStoryContext {
  story?: IStory;
  setStory: (story: IStory) => void;
  images: string[];
  setImages: (images: string[]) => void;
}

const GenerateStoryContext = createContext<IGenerateStoryContext>({
  story: undefined,
  setStory: () => {},
  images: [],
  setImages: () => {}
});

function GenerateStoryContextProvider({ children }: { children: PropsWithChildren<any> }) {
  const [story, setStory] = useState<IStory>();
  /*
   Note(Benson): For now images is an array of urls where each index in the array
   corresponds to the page number. 
   i.e., index 0 could be title, index 1 is the first page in pages, etc.
   */
  const [images, setImages] = useState<string[]>([]);

  const value = useMemo<IGenerateStoryContext>(
    () => ({ story, setStory, images, setImages }),
    [story, setStory, images, setImages]
  );

  return (
    <GenerateStoryContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </GenerateStoryContext.Provider>
  );
}

export const useGenerateStoryContext = (): IGenerateStoryContext =>
  useContext(GenerateStoryContext);

export default GenerateStoryContextProvider;
