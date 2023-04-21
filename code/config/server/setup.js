module.exports = (server) => {
  // Mock JANUS endpoints for SPA authentication
  server.get("/hmdlquery/HEIMDAL/api/v1/app/:appId/authdata", (req, res) => {
    if (!req.headers.cookie.includes("mock_janus_token")) {
      res.sendStatus(401);
      return;
    }

    res.json({
      appId: req.params.appId,
      login: "john",
      metadata: {
        roles: ["admin", "staff"],
      },
      attributes: [{ key: "tenants", values: ["za"] }],
      userData: {
        description: "Mock user",
        employeeId: "john_mock",
        employeeNumber: 2301232,
        id: "1d3ed22ba880a389174328fe",
        login: "john",
        mail: "john@test.com",
        name: "John Doe",
      },
    });
  });

  server.post("/authenticate", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.sendStatus(401);
      return;
    }

    const encodedCredentials = authHeader.split(" ")[1];

    const credentials = Buffer.from(encodedCredentials, "base64").toString();
    const [username, password] = credentials.split(":");

    if (!username || !password) {
      res.sendStatus(401);
      return;
    }

    res.cookie("mock_janus_token", "MOCK", { secure: false });
    res.sendStatus(200);
  });

  server.post("/authenticate/refresh", (req, res) => {
    res.cookie("mock_janus_token", "MOCK", { secure: false });
    res.sendStatus(200);
  });

  server.delete("/authenticate/revoke", (req, res) => {
    res.clearCookie("mock_janus_token");
    res.sendStatus(200);
  });

  // MOCKED SERVICE
  server.get("/frontend/v1/containers", (_, res) => {
    console.log('Endpoint1');
    setTimeout(() => {
      console.log('Endpoint2');
      res.json(
        Array(10)
          .fill(null)
          .map((_, index) => ({
            id: `id-${index}`,
            name: `Container ${index}`,
          })),
      );
    }, 1500);
  });

  server.get("/frontend/v1/product", (_, res) => {
    console.log('Endpoint1');
    setTimeout(() => {
      console.log('Endpoint2');
      res.json(
        Array(10)
          .fill(null)
          .map((_, index) => ({
            id: `id-${index}`,
            name: `Product ${index}`,
          })),
      );
    }, 1500);
  });

  // // To support GraphQL it's possible to integrate Apollo Server into the mock.
  // // All the required dependencies must be added to the project.
  // const { ApolloServer, gql } = require("apollo-server-express"); // eslint-disable-line global-require

  // const typeDefs = gql`
  //   type Query {
  //     greeting: String
  //   }
  // `;

  // const resolvers = {
  //   Query: {
  //     greeting: () => "hello world",
  //   },
  // };

  // const graphqlServer = new ApolloServer({ typeDefs, resolvers });
  // graphqlServer.applyMiddleware({ app: server });
  // console.log(`  >> GrapqQL endpoint: ${graphqlServer.graphqlPath}\n`); // eslint-disable-line no-console
};
