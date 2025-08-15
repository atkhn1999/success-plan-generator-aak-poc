import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Header, 
  MetaHeader, 
  Objectives, 
  CompletedObjectives, 
  InfoCards, 
  Details
} from './components';
import { useStore } from './store/useStore';

function ExternalView() {
  const { id } = useParams();

  useEffect(() => {
    // Set external view mode
    useStore.setState({ isExternalView: true });
    
    // Clean up on unmount
    return () => {
      useStore.setState({ isExternalView: false });
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Header />
      <MetaHeader />
      
      <main className="mx-auto max-w-[1200px] px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left pane */}
          <section className="col-span-12 space-y-6 xl:col-span-7">
            <Objectives />
            <CompletedObjectives />
            <InfoCards />
          </section>

          {/* Right pane */}
          <aside className="col-span-12 xl:col-span-5">
            <Details />
          </aside>
        </div>
      </main>

      <footer className="mx-auto max-w-[1200px] px-6 py-10 text-xs text-neutral-500">
        Success Plan Manager • External View
      </footer>
    </div>
  );
}

export default ExternalView;