import { Routes, Route, Link } from "react-router-dom";
import PresentationList from "./routes/PresentationList";
import DeckRunner from "./routes/DeckRunner";

export default function App() {
  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 h-full">
        <Routes>
          <Route path="/" element={<PresentationList />} />
          <Route path="/p/:id" element={<DeckRunner />} />
        </Routes>
      </main>
    </div>
  );
}
