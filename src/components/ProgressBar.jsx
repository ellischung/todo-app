/* Reference ProgressBar https://www.geeksforgeeks.org/how-to-create-a-custom-progress-bar-component-in-react-js/# */

const ProgressBar = ({ progress }) => {
  const Parentdiv = {
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
  };

  const Childdiv = {
    width: `${progress}%`,
    backgroundColor: "#636363",
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    color: "black",
    fontWeight: "bold",
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
