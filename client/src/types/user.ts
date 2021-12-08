import ROLE from "./Role";

type User = {
    // TODO: ID as number or string?
    id: Number;
    name: String;
    role: ROLE;
    status: String;
};

export default User;