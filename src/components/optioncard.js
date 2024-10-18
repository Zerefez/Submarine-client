import PropTypes from "prop-types";

const Optioncard = ({ icon, label, desc, classes, onStartTest }) => {
  return (
    <div
      className={
        "flex items-center gap-3 ring-2 ring-inset ring-zinc-50/10 rounded-2xl p-3 hover:bg-zinc-800 transition-colors group" +
        classes
      }
    >
      <button className="flex items-center justify-center bg-zinc-700/50 rounded-lg overflow-hidden w-12 h-12 p-0 group-hover:bg-zinc-900 transition-colors">
        <span className="material-symbols-rounded" style={{ fontSize: "40px" }}
        onClick={onStartTest}
        >
          {icon}
        </span>
      </button>
      <div>
        <h3 className="">{label}</h3>
        <p className="text-sm text-zinc-400">{desc}</p>
      </div>
    </div>
  );
};

Optioncard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string,
  desc: PropTypes.string,
  classes: PropTypes.string,
  onStartTest: PropTypes.func,
};

export default Optioncard;
