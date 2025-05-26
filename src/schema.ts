/**
 * Learn about schemas here:
 * https://jazz.tools/docs/react/schemas/covalues
 */

import { co, z } from "jazz-tools";


export const Location = co.map({
  x: z.number(),
  y: z.number(),
})

export const ListOfLocations = co.list(Location);

export const Account = co.account({
  root: co.map({}),
  profile: co.profile({
    locations: ListOfLocations,
  }),
});