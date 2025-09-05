import DefaultLayout from "../layouts/default";

export default function Video() {
  return (
    <DefaultLayout
      title="Video | Monica"
      description="Video dashboard for Monica AI">
      <div className={`flex flex-col min-h-screen ml-[180px] relative`}>
        Video
      </div>
    </DefaultLayout>
  );
}
