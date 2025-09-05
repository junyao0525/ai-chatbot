import DefaultLayout from "../layouts/default";

export default function Audio() {
  return (
    <>
      {" "}
      <DefaultLayout
        title="Audios | Monica"
        description="Chat dashboard for Monica AI">
        <div className={`flex flex-col min-h-screen ml-[180px] relative`}>
          Audios
        </div>
      </DefaultLayout>
    </>
  );
}
