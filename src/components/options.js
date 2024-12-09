import { useState, useEffect } from 'react';
import OptionCard from './optioncard';
import LinearWithValueLabel from './progressbar';

const Option = (props) => {
  const { submarines } = props;

  useEffect(() => {
    console.log('Submarines changed:', submarines);
    // Perform any side effects you need when submarines change
  }, [submarines]); //

  const optionItems = [
    /*{
      icon: "not_started",
      label: "Test spring layers",
      desc: "Start measuring the spring layers",
      requiresDepth: true,
    },*/
    {
      icon: 'not_started',
      label: 'Collect water measurements',
      desc: 'Start collecting water measurements',
      requiresDepth: true,
    },
  ];

  const [progress, setProgress] = useState(Array(optionItems.length).fill(0));
  const [isRunning, setIsRunning] = useState(
    Array(optionItems.length).fill(false)
  );
  const [depth, setDepth] = useState(Array(optionItems.length).fill('')); // Depth for each option
  const [isDepthValid, setIsDepthValid] = useState(
    Array(optionItems.length).fill(true)
  ); // Validity for each option
  const [errorMessage, setErrorMessage] = useState(
    Array(optionItems.length).fill('')
  ); // Error for each option
  const [defaultMessage, setDefaultMessage] = useState(
    Array(optionItems.length).fill('')
  ); // Default message for each option

  const handleStartTest = (index) => {
    if (isRunning[index]) return; // Prevent running again if already running

    // Validate depth for the specific test option
    let inputDepth = depth[index];
    if (!inputDepth || inputDepth < 0 || inputDepth > 500) {
      if (!inputDepth) {
        // Set default depth if input is empty
        setDepth((prev) => prev.map((d, i) => (i === index ? '500' : d)));
        setDefaultMessage((prev) =>
          prev.map((msg, i) =>
            i === index ? 'No input, 500 cm set as default' : msg
          )
        );
        inputDepth = '500';
      } else {
        setIsDepthValid((prev) =>
          prev.map((valid, i) => (i === index ? false : valid))
        );
        setErrorMessage((prev) =>
          prev.map((msg, i) =>
            i === index ? 'Depth must be between 0 and 500.' : msg
          )
        );
        return; // Prevent starting test with invalid depth
      }
    } else {
      setIsDepthValid((prev) =>
        prev.map((valid, i) => (i === index ? true : valid))
      );
      setErrorMessage((prev) => prev.map((msg, i) => (i === index ? '' : msg)));
      setDefaultMessage((prev) =>
        prev.map((msg, i) => (i === index ? '' : msg))
      );
    }

    // Start the test
    setIsRunning((prev) =>
      prev.map((running, i) => (i === index ? true : running))
    );

    setProgress((prev) => prev.map((prog, i) => (i === index ? 0 : prog)));

    const timer = setInterval(() => {
      setProgress((prev) =>
        prev.map((prog, i) => {
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
      setIsRunning((prev) =>
        prev.map((running, i) => (i === index ? false : running))
      );
    }, 8000); // Stop after 8 seconds

    const data = {
      measurementDepth: inputDepth, // The key is now 'measurementDepth'
    };

    fetch('http://192.168.0.1:8080/api/PostMeasurementDepth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data), // Send the data object as a JSON string
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log('Success:', data); // Handle success

        if (data.message === 'success') {
          alert('Request: ' + data.details);
          console.log('TEEEST');
        }
      })
      .catch((error) => {
        console.error('Error:', error); // Handle error
      });
  };

  const handleDepthChange = (index, value) => {
    setDepth((prev) => prev.map((d, i) => (i === index ? value : d)));

    // Validate the depth input for the specific option
    if (value < 0 || value > 500) {
      setIsDepthValid((prev) =>
        prev.map((valid, i) => (i === index ? false : valid))
      );
      setErrorMessage((prev) =>
        prev.map((msg, i) =>
          i === index ? 'Depth must be between 0 and 500.' : msg
        )
      );
    } else {
      setIsDepthValid((prev) =>
        prev.map((valid, i) => (i === index ? true : valid))
      );
      setErrorMessage((prev) => prev.map((msg, i) => (i === index ? '' : msg)));
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
          {optionItems.map(({ icon, label, desc, requiresDepth }, index) => (
            <div key={index}>
              <OptionCard
                icon={icon}
                label={label}
                desc={desc}
                onStartTest={() => handleStartTest(index)}
                requiresDepth={requiresDepth}
                depthValue={depth[index]}
                onDepthChange={(e) => handleDepthChange(index, e.target.value)}
                isDepthValid={isDepthValid[index]}
                errorMessage={errorMessage[index]}
                defaultMessage={defaultMessage[index]}
                isDepthDisabled={
                  submarines &&
                  !submarines.some((submarine) => submarine.available)
                } // Disable depth input if no submarines are available
                submarines={submarines}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Option;
