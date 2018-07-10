import test from "ava";
import { request, GraphQLClient } from "graphql-request";

const query = `
  {
   approvals
   {
       id,
       content
   }
  }
`;

test("if token is invalid, it should throw an error", async t => {
  try {
    const client = new GraphQLClient(
      "http://ec2-18-217-250-79.us-east-2.compute.amazonaws.com:41960/",
      {
        headers: {
          Authentication: "123"
        }
      }
    );
    await client.request(query);
    t.fail("it should fail");
  } catch (err) {
    t.pass();
  }
});

// test("foo", t => {
//   t.pass();
// });

// test("bar", async t => {
//   const bar = Promise.resolve("bar");

//   t.is(await bar, "bar");
// });
