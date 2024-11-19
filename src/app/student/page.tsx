"use client";
import TestSchool from "../_components/TestSchool";
import TestTuition from "../_components/TestTuition";

export default function Student() {
    return (
        <>
          <div className="flex flex-col justify-center items-center h-full m-4">
            <TestTuition />
            <TestSchool />
          </div>
        </>
      );
}