module.exports = {
    apps: [
      {
        name: "Umbrella-team",
        script: "npm",
        args: "run dev",
        env: {
          NODE_ENV: "development",
        },
      },
    ],
  };