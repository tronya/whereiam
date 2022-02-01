import type { NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import UsersListContainer from "../src/components/containers/UsersList/usersList.container";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../src/components/ui/Loader/loader";
import Wrapper from "../src/components/ui/Wrapper/wrapper";
import { useAuth } from "../src/hooks/useUser";
import MapBoxContainer from "../src/components/containers/Map/mapBox.container";
import useMarkers from "../src/hooks/useMarkers";
import { getGeolocation } from "./api/geolocation";
import { Geolocation } from "../src/models/geolocation.model";

const Home: NextPage = () => {
  const [map, setMap] = useState<mapboxgl.Map>();
  const [geolocation, setGeolocation] = useState<Geolocation[]>([]);

  const router = useRouter();
  const markers = useMarkers(map);
  const { user, loading } = useAuth();

  useEffect(() => {
    getGeolocation()
      .then((result) => setGeolocation(result))
      .catch((error) => toast.error(error));
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!user || !geolocation.length) {
    return <Loader />;
  }

  return (
    <Wrapper>
      <Head>
        <title>whereiam</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container>
          <Grid item xs={12} sm={6} lg={3}>
            <UsersListContainer geolocation={geolocation} />
          </Grid>

          <Grid item xs={12} sm={6} lg={9}>
            <MapBoxContainer markers={markers} map={map} onSetMap={setMap} />
          </Grid>
        </Grid>
      </main>
    </Wrapper>
  );
};

export default Home;
