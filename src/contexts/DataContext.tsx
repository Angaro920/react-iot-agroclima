import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import useGetESP32Data from "../hooks/useGetESP32Data";

interface WeatherData {
  luz: number;
  temperatura: number;
  humedad: number;
  hidrogeno: number;
}

interface WeatherUnits {
  luz: string;
  temperatura: string;
  humedad: string;
  hidrogeno: string;
}

interface WeatherContextData {
  currentData: WeatherData;
  historicalData: WeatherHistoricalData;
  units: WeatherUnits;
}
interface MongoObject {
  time: Date;
  data: string;
}

interface WeatherHistoricalData {
  luz: MongoObject[];
  temperatura: MongoObject[];
  humedad: MongoObject[];
  hidrogeno: MongoObject[];
}

const WeatherContext = createContext<WeatherContextData | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [historicalData, setHistoricalData] = useState<WeatherHistoricalData>({
    luz: [],
    temperatura: [],
    humedad: [],
    hidrogeno: [],
  });

  const { data } = useGetESP32Data();

  const parsedData: WeatherData =
    typeof data === "string" ? JSON.parse(data) : data;
  // Definimos las unidades de medida
  const units: WeatherUnits = {
    temperatura: "°C",
    humedad: "%",
    hidrogeno: "PPM",
    luz: "%",
  };
  useEffect(() => {
    fetchHistoricalData();
  },[])

  const fetchHistoricalData = async () => {
    const historicalData =  await fetch("http://localhost:8000/api/temperatura12")
    const data = await historicalData.json()
    /* console.log(data) */
    setHistoricalData(data)
  }
  
  return (
    <WeatherContext.Provider
      value={{ currentData: parsedData, units, historicalData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
