import { useIframeHashRouter } from "hash-slash";
import { Group } from "jazz-tools"
import { useAccount, useCoState } from "jazz-react";
import { Account, Location, ListOfLocations } from "./schema.ts";
import { Map } from "./Map.tsx"

function MapofLocations(props: { locationId: any }) {
  const savedLocations = useCoState(ListOfLocations, props.locationId);


  const clickEvent = (event: any) => {

    if (!event.target.closest('path')) return;

    // needs to be relative to svg placement 
    const svg = event.target.parentElement
    const pt = svg.createSVGPoint()
    pt.x = event.clientX
    pt.y = event.clientY
    const coords = pt.matrixTransform(svg.getScreenCTM().inverse())

    const location = Location.create({
      x: coords.x - 5,
      y: coords.y - 28,
    }, savedLocations?._owner)

    savedLocations?.push(location)
  }

  return (
    <>
      <div>
        <Map clickHandler={clickEvent}>
          {!!savedLocations &&
            savedLocations.map((location: any) =>
              <>
                {!!location ?
                  <image href="pushpin.png" height="30px" width="30px" x={location.x} y={location.y} style={{ position: "absolute", left: location.x, top: location.y }}></image>
                  : <>Location not found</>
                }
              </>
            )}
        </Map>
      </div>
    </>
  )
}

function App() {
  const router = useIframeHashRouter();
  useAccount(Account, {
    resolve: { profile: true },
  });

  const createLocations = () => {
    const publicGroup = Group.create();
    publicGroup.addMember("everyone", "writer");

    const locations = ListOfLocations.create([], { owner: publicGroup });
    router.navigate("/#/locations/" + locations.id);
  }

  return (
    <>
      {router.route({
        "/": () => createLocations() as never,
        "/locations/:id": (id) => <MapofLocations locationId={id} />,
      })}
    </>
  );
}

export default App;
