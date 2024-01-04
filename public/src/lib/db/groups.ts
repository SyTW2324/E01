export interface Group {
    gid: string;
    members: {[userID: string]: string};
    name: string;
}

export async function getGroups(): Promise<Group[]> {
  // TODO use real API
  return (await fetch("http://localhost:5173/test-groups.json")).json()
}
