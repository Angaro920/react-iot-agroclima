import {Chart} from "@antv/g2"
import { MongoObject } from "../../constants/MongoObject";
import { useEffect, useRef } from "react";
interface ChartComponentProps {
  data: MongoObject[]; 
}
export const BarChartComponent = ({ data }: ChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = new Chart({
        container: chartContainerRef.current,
        autoFit: true,
      });

      chart
        .interval()
        .data(data)
        .encode('x', '_id')
        .encode('y', 'promedio')
        .style({fill: '#ca6f1e'})

      chart.render();
      chartRef.current = chart;
    }
    return () => {
      chartRef.current?.destroy();
    }
  }, [data]);

  return <div ref={chartContainerRef} style={{ height: 400 }} />;
};