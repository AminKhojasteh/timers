import { useAuthContext } from "./hooks/useAuthContext";
import EntryPage from "./pages/entryPage";
import HomePage from "./pages/homePage";

function App() {
  const { user } = useAuthContext();
  // console.log(user);

  return (
    <div className="mx-auto max-w-[30rem]">
      {!user && <EntryPage />}
      {user && <HomePage />}
    </div>
  );
}

export default App;
