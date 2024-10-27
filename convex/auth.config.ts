// eslint-disable-next-line import/no-anonymous-default-export
export default {
  providers: [
    {
      domain: `https://${process.env.CLERK_HOSTNAME}`,
      applicationID: "convex",
    },
  ],
};
