import { useEffect, useState } from "react";
import Optioncard from "./optioncard";
import LinearWithValueLabel from "./progressbar";

const Option = () => {
  const optionItems = [
    {
      icon: "not_started",
      label: "Test Water Levels",
      desc: "Start testing the water levels",
      onStartTest: () => {
        handleStartTest(0); // First test
      },
    },
    {
      icon: "not_started",
      label: "Test Temperature",
      desc: "Start testing the temperature",
      onStartTest: () => {
        handleStartTest(1); // Second test
      },
    },
    {
      icon: "not_started",
      label: "Test pressure",
      desc: "Start testing the pressure",
      onStartTest: () => {
        handleStartTest(2); // Third test
      },
    },
  ];

  const [progress, setProgress] = useState(Array(optionItems.length).fill(0));
  const [isRunning, setIsRunning] = useState(Array(optionItems.length).fill(false));
  
  useEffect(() => {
    // Reset progress when the page is refreshed
    setProgress(Array(optionItems.length).fill(0));
    setIsRunning(Array(optionItems.length).fill(false));
  }, [optionItems.length]);

  const handleStartTest = (index) => {
    if (isRunning[index]) return; // Prevent from running again if already running

    setIsRunning((prevIsRunning) =>
      prevIsRunning.map((running, i) => (i === index ? true : running))
    );

    setProgress((prevProgress) =>
      prevProgress.map((prog, i) => (i === index ? 0 : prog))
    );

    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress.map((prog, i) => {
          if (i === index) {
            const newProgress = prog + 10;
            return newProgress >= 100 ? 100 : newProgress; // Stop at 100%
          }
          return prog;
        })
      );
    }, 800);

    setTimeout(() => {
      clearInterval(timer);
      setIsRunning((prevIsRunning) =>
        prevIsRunning.map((running, i) => (i === index ? false : running)) // Set the test as not running
      );
    }, 8000); // Stop after 8 seconds
  };

  return (
    <section id="analytics" className="section">
      <div className="container">
        <h2 className="headline-2">These are your test options</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Using the options below, you can start testing.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(250,_1fr))] gap-3">
          {optionItems.map(({ icon, label, desc, onStartTest }, index) => (
            <div key={index}>
              <Optioncard
                icon={icon}
                label={label}
                desc={desc}
                onStartTest={onStartTest}
              />
              <div className="block my-3 ">
                <div  className=" bg-zinc-800/50 p-3 rounded-2xl md:p-3 ">
                <h3 className="text-zinc-300 mb-2">
                {isRunning[index] ? "Test in progress" : desc}
                </h3>
                <LinearWithValueLabel value={progress[index]} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Option;
