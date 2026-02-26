import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => {
    set({ accessToken: null, user: null, loading: false }); //hàm này tái sử dụng nhiều lần khi logout hoặc token hết hạn
  },

  signUp: async (username, password, email, firstName, lastName) => {
    try {
      set({ loading: true });
      // gọi API
      await authService.signUp(username, password, email, firstName, lastName);

      toast.success(
        "Đăng kí thành công! Bạn sẽ được chuyển sang trang đăng nhập.",
      );
    } catch (error) {
      console.error(error);
      toast.error("Đăng kí không thành công");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });

      const { accessToken } = await authService.signIn(username, password);
      set({ accessToken });

      await get().fetchMe();

      toast.success("Chào mừng bạn quay trở lại với Qiuchat");
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập không thành công!");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      toast.success("Logout thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi xảy ra khi logout. Hãy thử lại");
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();

      set({ user });
    } catch (error) {
      console.error(error);
      set({ user: null, accessToken: null });
      toast.error("Lỗi xảy ra khi lấy dữ liệu người dùng. Hãy thử lại!");
    } finally {
      set({ loading: false });
    }
  },
}));
