import { useState } from "react"; // <-- Importante
import { Modal, Menu } from "antd"; // Modal agregado
import { useUser } from "../../hooks/useAuthUser";
import { useAuth } from "../../hooks/useAuth"; 
import { Pages } from "../../constants/pages";
import {
  ControlOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { FormReport } from "../FormReport";
import { FileSearchOutlined } from "@ant-design/icons"; // nuevo ícono
import { FormAuditReport } from "../FormAuditReport";


type MenuItem = Required<MenuProps>["items"][number];

// Ahora "Reportes" no tendrá hijos
const getMenuItems = (tag: string): MenuItem[] => {
  const baseItems: MenuItem[] = [
    {
      key: Pages.DASHBOARD,
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "Reports", // Mantienes este
      label: "Reportes",
      icon: <DatabaseOutlined />,
    },
  ];

  if (tag === "administrador") {
    baseItems.push(
      {
        key: Pages.DEVICES,
        label: "Dispositivos",
        icon: <ControlOutlined />,
      },
      {
        key: Pages.USERS,
        label: "Usuarios",
        icon: <TeamOutlined />,
      },
      {
        key: "AuditReport", 
        label: "Auditoría",
        icon: <DatabaseOutlined />,
      }
    );
  } else if (tag === "docente") {
    baseItems.push({
      key: Pages.DEVICES,
      label: "Dispositivos",
      icon: <ControlOutlined />,
    });
  }

  baseItems.push(
    { type: "divider" },
    {
      key: "logout",
      label: "Cerrar sesión",
      icon: <LogoutOutlined />,
    }
  );

  return baseItems;
};

export const MenuDashboard = ({ setCurrentPage }: { setCurrentPage: (key: string) => void }) => {
  const { user, loading } = useUser();
  const { logout } = useAuth();

  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false); // <-- Modal para Reportes
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false); // NUEVO

  if (loading) return <p>Cargando...</p>;

  const items = getMenuItems(user?.tag || "estudiante");

  return (
    <>
      <Menu
        defaultSelectedKeys={["1"]}
        items={items}
        theme="dark"
        mode="inline"
        onClick={(event) => {
          if (event.key === "logout") {
            logout();
            window.location.href = "/";
          } else if (event.key === "Reports") {
            setIsReportsModalOpen(true); // <-- Mostrar modal si es "Reports"
          } else  if (event.key === "AuditReport") {
            setIsAuditModalOpen(true);
          } else {
            setCurrentPage(event.key);
          }
        }}
      />
      
      {/* Modal de Reportes */}
      <Modal
        title="Generar Reporte"
        open={isReportsModalOpen}
        onOk={() => setIsReportsModalOpen(false)}
        onCancel={() => setIsReportsModalOpen(false)}
        width={700}
      >
        <FormReport />
      </Modal>

            {/* Modal de Reporte de Auditoría */}
      <Modal
        title="Reporte de Auditoría"
        open={isAuditModalOpen}
        onOk={() => setIsAuditModalOpen(false)}
        onCancel={() => setIsAuditModalOpen(false)}
        width={700}
      >
        <FormAuditReport />
      </Modal>
    </>
  );
};