// import { invoke } from "@tauri-apps/api/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main/main";
import AddMoney from "./components/addMoney/addMoney";
import EditEnvelopes from "./components/editEnvelopes/editEnvelopes";
import NewEnvelope from "./components/editEnvelopes/newEnvelope/newEnvelope";
import SimpleDraggableList from "./test";

function App() {

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            {/* <Route index element={<Main />} /> */}
          </Route>
          <Route path="/add" element={<AddMoney />} />
          <Route path="/edit-envelopes" element={<EditEnvelopes />} />
          <Route path="/edit-envelopes/:id" element={<p>todo</p>} />
          <Route path="/edit-envelopes/new" element={<NewEnvelope />} />
          <Route path="/test" element={<SimpleDraggableList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
