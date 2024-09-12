import { create } from "zustand";

const useUserStore = create((set) => ({
  userType: 'Writer',
  setUserType: (type) => set({ userType: type }),
}));

export default useUserStore;