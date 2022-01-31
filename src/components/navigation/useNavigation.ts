import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useNavigation = () => {
  const [geolocation, setGeolocation] = useState<GeolocationPosition>();

  useEffect(() => {
     navigator.geolocation.getCurrentPosition(
        (success: GeolocationPosition) => {
            setGeolocation(success);
        },
        (error: GeolocationPositionError) => {
            toast.warning(error.message);
        }
    );
  },[]);

  return geolocation;
};