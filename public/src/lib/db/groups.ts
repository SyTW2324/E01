export interface Group {
    gid: string;
    members: {[userID: string]: string};
    name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getGroups(uid: string): Promise<Group[]> {
  // TODO use real API
  return (await fetch("http://localhost:5173/test-groups.json")).json()
}
