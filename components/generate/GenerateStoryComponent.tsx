'use-client';
import GenerateStoryContextProvider, { IGenerateStoryContext } from './GenerateStoryContext';

export default function GenerateStoryComponent() {
  return (
    <GenerateStoryContextProvider>
      {({ story, loading }: IGenerateStoryContext) => {
        return (
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {loading ? <div className="mb10">Loading...</div> : null}
          </main>
        );
      }}
    </GenerateStoryContextProvider>
  );
}
