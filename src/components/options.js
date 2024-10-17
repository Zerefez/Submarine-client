import Optioncard from "./optioncard";

const optionItem = [
  {
    icon: "not_started", // Material icon name
    label: "Start a new test",
    desc: "Start testing the water levels",
  },

  {
    icon: "not_started", // Material icon name
    label: "Start a new test",
    desc: "Start testing the water levels",
  },
];


const Option = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="headline-2">
          These are your test options
        </h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Using the options below, you can start testing.
        </p>
        <div className="grid grid-cols-[repeat (auto-fill,_minmax(250,_1fr))] gap-3">
          {optionItem.map(({ icon, label, desc }, key) => (
            <Optioncard
              key={key}
              icon={icon}
              label={label}
              desc={desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Option;
