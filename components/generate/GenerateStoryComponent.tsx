'use-client';
import chatOperations from 'operations/chatOperations';
import { useState } from 'react';
import GenerateStoryContextProvider, { IGenerateStoryContext } from './GenerateStoryContext';

export default function GenerateStoryComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const getStory = async () => {
    setLoading(true);
    const data = await chatOperations.createStoryAsync();
    setData(data);
    setLoading(false);
  };

  return (
    <GenerateStoryContextProvider>
      {({ story }: IGenerateStoryContext) => {
        return (
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button
              onClick={getStory}
              className="mb-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Run A New Story
            </button>

            {loading ? <div className="mb10">Loading...</div> : null}
            {JSON.stringify(data)}
          </main>
        );
      }}
    </GenerateStoryContextProvider>
  );
}
