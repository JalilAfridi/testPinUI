import PinInput from "./PinInput";

const App = () => {
  const handleComplete = (values) => {
    console.log(values);
  };

  return (
    <PinInput
      length={4}
      onComplete={handleComplete}
      regex={/^[0-9a-zA-Z]$/}
      defaultValue="2"
      fancyUI={true}
    />
  );
};

export default App;
