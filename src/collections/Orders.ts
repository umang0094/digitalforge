import { User } from "@/payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";

const yourOwnOrders: Access = async ({ req }) => {
  const user = req.user as User | null;
  if (!user) return false;
  if (user.role == "admin") {
    return true;
  }
  return {
    user: {
      equals: user.id,
    },
  };
};
export const Orders: CollectionConfig = {
  slug: "orders",

  admin: {
    useAsTitle: "Your Orders",
    description: "A summary of all your orders",
  },
  access: {
    read: yourOwnOrders,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
    create: ({ req }) => req.user.role === "admin",
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: "_isPaid",
      type: "checkbox",
      access: {
        read: ({ req }) => req.user.role == "admin",
        create: () => false,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      required: true,
      hasMany: true,
    },
  ],
};
