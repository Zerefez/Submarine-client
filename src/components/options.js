import { useEffect, useState } from "react";
import Optioncard from "./optioncard";
import LinearWithValueLabel from "./progressbar";

const Option = () => {
  const optionItems = [
    {
      icon: "not_started",
      label: "Test spring layers",
      desc: "Start measuring the spring layers",
      onStartTest: (depth) => {
        handleStartTest(0, depth);
      },
      requiresDepth: true,
    },
    {
      icon: "not_started",
      label: "Collect water sample",
      desc: "Start collecting water sample",
      onStartTest: () => {
        handleStartTest(1); // Second test
      },
    },
  ];

  const [progress, setProgress] = useState(Array(optionItems.length).fill(0));
  const [isRunning, setIsRunning] = useState(Array(optionItems.length).fill(false));
  const [depth, setDepth] = useState(""); // Track the depth for water levels test
  const [isDepthValid, setIsDepthValid] = useState(true); // Check if depth is valid
  const [errorMessage, setErrorMessage] = useState(""); // Error message for invalid depth
  const [defaultMessage, setDefaultMessage] = useState(""); // Default message for depth

  useEffect(() => {
    // Reset progress when the page is refreshed
    setProgress(Array(optionItems.length).fill(0));
    setIsRunning(Array(optionItems.length).fill(false));
  }, [optionItems.length]);

  const handleStartTest = (index, inputDepth) => {
    if (isRunning[index]) return; // Prevent from running again if already running

    // If the depth is required but empty, set it to 500 by default
    if (index === 0 && !inputDepth) {
      setDepth("500");
      setDefaultMessage("No input, 500 cm set as default");
      inputDepth = "500"; // Set inputDepth to 500 if no input is provided
    }

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

  const handleDepthChange = (e) => {
    const value = e.target.value;
    setDepth(value);

    // Validate the depth input (positive number and within 0-500)
    if (value < 0 || value > 500) {
      setIsDepthValid(false);
      setErrorMessage("Depth must be between 0 and 500.");
    } else {
      setIsDepthValid(true);
      setErrorMessage("");
    }
  };

  return (
    <section id="analytics" className="section">
      <div className="container">
        <h2 className="headline-2">These are your test options</h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Using the options below, you can start testing.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(250,_1fr))] gap-3">
          {optionItems.map(
            ({ icon, label, desc, onStartTest, requiresDepth }, index) => (
              <div key={index}>
                <Optioncard
                  icon={icon}
                  label={label}
                  desc={desc}
                  onStartTest={requiresDepth ? () => onStartTest(depth) : onStartTest}
                  requiresDepth={requiresDepth}
                  depthValue={depth}
                  onDepthChange={handleDepthChange}
                  isDepthValid={isDepthValid}
                  errorMessage={errorMessage}
                  defaultMessage={defaultMessage}
                />
                <div className="block my-3">
                  <div className="bg-zinc-800/50 p-3 rounded-2xl md:p-3">
                    <h3 className="text-zinc-300 mb-2">
                      {label} progress: {progress[index]}%
                    </h3>
                    <LinearWithValueLabel value={progress[index]} />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Option;
