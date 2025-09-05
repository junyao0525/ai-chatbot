import DefaultLayout from "../layouts/default";

export default function Memo() {
  return (
    <DefaultLayout
      title="Memo | Monica"
      description="Memo dashboard for Monica AI">
      <div className={`flex flex-col min-h-screen ml-[180px] relative`}>
        Memo
      </div>
    </DefaultLayout>
  );
}
