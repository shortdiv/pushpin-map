import { Group } from "jazz-tools"
import { useAccount, useCoState } from "jazz-react";
import { Account, Location, ListOfLocations } from "./schema.ts";
import { Map } from "./Map.tsx"

function MapofLocations(props: { locationId: any, group: any }) {
  const savedLocations = useCoState(ListOfLocations, props.locationId);

  const clickEvent = (event: any) => {
    const location = Location.create({
      x: event.clientX,
      y: event.clientY,
    }, { owner: props.group })

    savedLocations?.push(location)
  }

  return (
    <>
      <div onClick={clickEvent}>
        <Map />
      </div>

      {!!savedLocations ?
        savedLocations.map((location: any) =>
          <>
            <img src="pushpin.png" style={{ position: "absolute", left: location.x, top: location.y }}></img>
          </>
        )
        :
        <p>No location found</p>
      }
    </>
  )
}

function App() {
  // const router = useIframeHashRouter();
  const { me } = useAccount(Account, {
    resolve: { profile: true },
  });

  const publicGroup = Group.create();
  publicGroup.addMember("everyone", "writer");

  const locations = ListOfLocations.create([], { owner: publicGroup });

  return (
    <>
      <MapofLocations locationId={locations.id} group={publicGroup} />
    </>
  );
}

export default App;
