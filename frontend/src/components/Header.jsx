import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Header() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogoutClick = function () {
    logout();
  };
  return (
    <div className="grid h-full grid-cols-[1fr_max-content] items-center gap-x-2">
      <p className="text-lg font-semibold text-amber-600">{user.email}</p>
      <button
        onClick={handleLogoutClick}
        className="cursor-pointer justify-self-end rounded-md bg-amber-800 px-2 py-1 text-xs text-gray-950"
      >
        Log out
      </button>
    </div>
  );
}

export default Header;
