import "./MySass.scss";
import MyForm from "./components/MyForm";

const App = () => (
  <>
    <h1>React Forms!!!</h1>
    <MyForm
      label="Nasz Fomrularz"
      formSubmissionHandler={(data) => {
        console.log(">> App Is Calling!", data);
      }}
    />
  </>
);

export default App;
