"use client";

import Card from "./defaultCard";

export const Default = () => {
  // Shared styles for the content blocks

  return (
    <>
      <div className="h-10" />

      <h1 className="text-3xl font-bold text-[var(--text-primary)]">Welcome</h1>

      <div className="flex flex-col mt-4 space-y-4">
        <div className="flex flex-row w-full h-[300px] space-x-2">
          {/* ai tool , image tool , memberShip */}
          <Card
            title="AI Tool"
            link="#">
            <div className="text-[var(--text-secondary)]">
              Some AI tools list here…
            </div>
          </Card>

          <Card
            title="Image"
            link="#">
            <div className="grid grid-cols-4 grid-rows-4 gap-4 h-full pt-4 pb-8">
              {/* Full-height left column */}
              <div className="col-span-2 row-span-4  w-full h-full ">
                <div className="rounded-lg border border-[var(--border-nav)] w-full h-full">
                  <span className="text-3xl text-bold text-[var(--text-primary)]">
                    Image Generator
                  </span>
                </div>
              </div>

              {/* Top right */}
              <div className="col-span-2 row-span-2 bg-blue-100 w-full h-full">
                02
              </div>

              {/* Bottom right */}
              <div className="col-span-2 row-span-2 bg-green-100 w-full h-full">
                03
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
