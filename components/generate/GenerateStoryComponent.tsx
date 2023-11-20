'use-client';
import GenerateStoryContextProvider, { IGenerateStoryContext } from './GenerateStoryContext';
import StoryPDFViewer from 'components/pdf/StoryPDFViewer';

export default function GenerateStoryComponent() {
  return (
    <GenerateStoryContextProvider>
      {({ story, titleImage, loading }: IGenerateStoryContext) => {
        return (
          <div>
            {loading ? <div>Loading...</div> : null}
            {story && <StoryPDFViewer story={story} titleImage={titleImage} />}
          </div>
        );
      }}
    </GenerateStoryContextProvider>
  );
}
