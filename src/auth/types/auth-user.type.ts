import { UserRole } from "@/users/enums/user-role.enum";

export type AuthUser = {
  userId: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
};

