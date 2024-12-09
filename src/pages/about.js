const aboutItems = [
  {
    label: "Submarines",
    number: 9,
  },
  {
    label: "Total messurments",
    number: 100,
  },
];

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className=" bg-zinc-800/50 p-7 rounded-2xl md:p-12 ">
          <p className=" text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[100ch]">
            Welcome to your submarine basestation. This application is designed
            to help you monitor and manage your submarine fleet. For more
            information, please contact us. Happy exploring!
          </p>

          <div className=" flex flex-wrap items-center md:gap-7">
            {aboutItems.map(({ label, number }, key) => (
              <div key={key}>
                <div className=" flex imtems-center md:mb-2 ">
                  <span className=" text-2xl font-semibold md:text-4xl">
                    {number}
                  </span>
                  <span className="text-sky-400 font-semibold md:text-3xl">
                    +
                  </span>
                </div>
                <p className=" text-sm text-zinc-400"> {label}</p>
              </div>
            ))}
            <img
              src="images\Submarine-logo.png"
              alt="Logo"
              width={30}
              height={30}
              className="ml-auto md:w-[40px] md:h-[40px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
