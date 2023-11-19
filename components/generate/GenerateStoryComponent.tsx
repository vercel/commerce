'use-client';
import Image from 'next/image';
import chatOperations from 'operations/chatOperations';
import imageOperations from 'operations/imageOperations';
import { useState } from 'react';
import GenerateStoryContextProvider, { IGenerateStoryContext } from './GenerateStoryContext';

export default function GenerateStoryComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [cover, setCover] = useState('');

  const getStory = async () => {
    setLoading(true);
    const data = await chatOperations.createStoryAsync();
    setData(data);
    setLoading(false);
  };

  const getCover = async () => {
    setLoading(true);
    const data = await imageOperations.createImageAsync(
      'make a cover image of the best book in the world for children'
    );
    const coverURL = data.text[0].url;
    setCover(coverURL);
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

            <button
              onClick={getCover}
              className="mb-10 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Get a Title Image
            </button>

            {loading ? <div className="mb10">Loading...</div> : null}

            {cover && <img src={cover} alt="" width={500} height={500} />}

            {JSON.stringify(data)}

            {JSON.stringify(data)}
          </main>
        );
      }}
    </GenerateStoryContextProvider>
  );
}
