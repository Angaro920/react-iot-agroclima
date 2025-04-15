import { Table  } from "antd";
import { FC } from "react";
import { DataType } from "../../types";
import { es } from 'date-fns/locale'

es.code= 'es-CO'

interface DataTableProps {
  title: string;
  weather: DataType[];
  loading: boolean;
  sufijo: string;
}

const columns = [
  {
    title: "Registro",
    dataIndex: "promedio",
    width: 300,
  },
  {
    title: "Fecha",
    dataIndex: "fecha",
  },
];

export const ReportTable: FC<DataTableProps> = ({
  title,
  weather,
  loading,
  sufijo,
}) => {
  const mappedData: Partial<DataType>[] = weather.map((item) => ({
    key: item._id || "",
    _id: item._id,
    promedio: item.promedio + " " + sufijo,
    fecha: item.fecha,
  }));
  

 
  return (
    <>
      <h1>Historico de {title} </h1>
      <div>
        <Table<DataType>
          columns={columns}
          dataSource={mappedData as DataType[]}
          loading={loading}
          style={{ height: "auto" }}
        />
      </div>
    </>
  );
};
