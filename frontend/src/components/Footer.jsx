import { useCreateNewTimer } from "../hooks/useCreateNewTimer";
import { useDeleteUser } from "../hooks/useDeleteUser";

function Footer() {
  const { createNewTimerLoading, createNewTimer } = useCreateNewTimer();
  const { deleteUserLoading, deleteUser } = useDeleteUser();

  const handleCreateNewTimerClick = async function () {
    await createNewTimer();
  };

  const handleDeleteUser = async function () {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser();
    }
  };

  return (
    <div className="grid grid-cols-2">
      <button
        disabled={createNewTimerLoading}
        onClick={handleCreateNewTimerClick}
        className="w-2/3 rounded-lg bg-amber-800 py-1 text-sm font-semibold text-gray-950"
      >
        + New Timer
      </button>
      <button
        onClick={handleDeleteUser}
        className="cursor-pointer self-end justify-self-end rounded-md bg-gray-800 px-2 py-1 text-xs text-amber-700"
      >
        Delete user
      </button>
    </div>
  );
}

export default Footer;
