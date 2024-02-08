import user, { initialState } from "../user";

describe("tests for user slice", () => {
  it("initialize slice with initialValue", () => {
    const userSliceInit = user(initialState, { type: "unknown" });
    expect(userSliceInit).toBe(initialState);
  });

//   it("should update user state when loginSuccess is dispatched", () => {
//     const testData = {
//         user: {
//             firstName: "Henry",
//             lastName: "Morrow",
//             username: "hjmorrow23",
//             email: "hjmorrow23@gmail.com",
//             roles: [
//               {
//                 "$oid": "62f00d595d488e528b048058"
//               },
//               {
//                 "$oid": "62f00d595d488e528b048059"
//               },
//               {
//                 "$oid": "62f00d595d488e528b04805a"
//               }
//             ],
//           }
//     };

//     const afterReducerOperation = user(
//         initialState, 
//         user.loginSuccess(testData)
//     );

//     expect(afterReducerOperation).toStrictEqual(testData);
//   });
});
