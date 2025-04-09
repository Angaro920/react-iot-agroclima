import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";
import { MongoObject } from "../../constants/MongoObject";

interface ChartComponentProps {
  data: MongoObject[];
}

export const LineChartComponent = ({ data }: ChartComponentProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = new Chart({
        container: chartContainerRef.current,
        autoFit: true,
      });

      chart
        .data(data)
        .encode("x", "_id")
        .encode("y", "promedio")
        .scale("x", {
          range: [0, 1],
        })
        .scale("y", {
          domainMin: 0,
          nice: true,
        });

      chart.line()

      chart.point().style("fill", "white").tooltip(false);
      chart.animate('enter', { type: 'pathIn', duration: 1000 });
      chart.render();

      chartRef.current = chart;
    }

    return () => {
      chartRef.current?.destroy();
    };
  }, [data]);

  return <div ref={chartContainerRef} style={{ height: 400 }} />;
};
