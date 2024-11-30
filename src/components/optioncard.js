import PropTypes from "prop-types";

const Optioncard = ({
  icon,
  label,
  desc,
  classes,
  onStartTest,
  requiresDepth,
  depthValue,
  onDepthChange,
  isDepthValid,
  errorMessage,
  defaultMessage,
}) => {
  return (
    <div
      className={
        "flex items-center gap-3 ring-2 ring-inset ring-zinc-50/10 rounded-2xl p-3 hover:bg-zinc-800 transition-colors group" +
        classes
      }
    >
      <button
        className="flex items-center justify-center bg-zinc-700/50 rounded-lg overflow-hidden w-12 h-12 p-0 group-hover:bg-zinc-900 transition-colors"
        onClick={onStartTest}
        disabled={requiresDepth && !isDepthValid}
      >
        <span
          className="material-symbols-rounded"
          style={{ fontSize: "40px" }}
        >
          {icon}
        </span>
      </button>
      <div>
        <h3>{label}</h3>
        <p className="text-sm text-zinc-400">{desc}</p>
        {requiresDepth && (
          <div className="mt-3">
            <input
              type="number"
              className="p-2 border border-zinc-400 rounded-lg w-full md:w-[250px] text-zinc-900"
              placeholder="Enter Depth in cm (e.g. 100)"
              value={depthValue}
              onChange={onDepthChange}
            />
            {!isDepthValid && (
              <span className="text-red-500 text-sm ml-2">{errorMessage}</span>
            )}
            {defaultMessage && (
              <span className="text-yellow-500 text-sm ml-2">{defaultMessage}</span>
            )}
          </div>
        )}
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
  requiresDepth: PropTypes.bool,
  depthValue: PropTypes.string,
  onDepthChange: PropTypes.func,
  isDepthValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  defaultMessage: PropTypes.string,
};

export default Optioncard;
