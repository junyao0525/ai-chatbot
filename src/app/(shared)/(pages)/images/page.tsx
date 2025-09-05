import DefaultLayout from "../layouts/default";

export default function Image() {
  return (
    <>
      {" "}
      <DefaultLayout
        title="Images | Monica"
        description="Images dashboard for Monica AI">
        <div className={`flex flex-col min-h-screen ml-[180px] relative`}>
          images
        </div>
      </DefaultLayout>
    </>
  );
}
