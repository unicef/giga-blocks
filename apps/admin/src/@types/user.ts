export type UserType = {
  id: string;
  name: string;
  email: string;
  walletAddress: string | null;
  profileImage: string | null;
  roles: string[];
  isActive: boolean;
  isBlocked: boolean;
  isApproved: boolean;
  lastLoggedIn: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
