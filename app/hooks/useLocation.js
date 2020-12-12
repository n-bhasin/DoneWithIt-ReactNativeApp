import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default useLocation = () => {
  const [location, setLocation] = useState();
  const requestLocation = async () => {
    const { granted } = await Location.requestPermissionsAsync();
    if (!granted) return;
    else {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setLocation({ latitude, longitude });
    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return location;
};
