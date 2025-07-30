import {
  BarChart2,
  Circle,
  Database,
  FileText,
  Home,
  Lock,
  Map,
  MessageCircle,
  Package,
  PieChart,
  Settings,
  User,
} from "react-feather";

const menu = [
  {
    id: "informasi_view",
    title: "Informasi",
    icon: <Home size={20} />,
    navLink: "/informasi",
  },
  {
    id: ["diskusi_publik", "diskusi_admin"],
    title: "Diskusi",
    icon: <MessageCircle size={20} />,
    children: [
      {
        id: "diskusi_publik",
        title: "Diskusi Publik",
        icon: <Circle size={20} />,
        navLink: "/diskusi/publik/list",
      },
      {
        id: "diskusi_admin",
        title: "Diskusi Admin",
        icon: <Circle size={20} />,
        navLink: "/diskusi/admin/list",
      },
    ],
  },
  {
    id: "survey_view",
    title: "Survey",
    icon: <FileText size={20} />,
    navLink: "/survey/list",
  },
  {
    id: ["rekap_rekapitulasi", "rekap_rekapitulasi_matrix"],
    header: "Rekap",
  },
  {
    id: "rekap_rekapitulasi",
    title: "Rekapitulasi",
    icon: <PieChart size={20} />,
    navLink: "/rekap",
  },
  {
    id: "rekap_rekapitulasi_matrix",
    title: "Rekapitulasi Matrix",
    icon: <BarChart2 size={20} />,
    navLink: "/rekapitulasi",
    children: [
      {
        id: "rekapitulasiMatrikRUK",
        title: "Rekapitulasi Matrix RUK",
        icon: <Circle size={20} />,
        navLink: "/rekapitulasi/matrix-ruk",
      },
      {
        id: "rekapitulasiUsulanPerProvinsi",
        title: "Rekapitulasi Usulan per Provinsi",
        icon: <Circle size={20} />,
        navLink: "/rekapitulasi/usulan-provinsi",
      },
      {
        id: "rekapitulasiUsulanPerKabupaten",
        title: "Rekapitulasi Usulan per Kabupaten",
        icon: <Circle size={20} />,
        navLink: "/rekapitulasi/usulan-kabupaten",
      },
    ],
  },
  {
    id: [
      "management_user_crud",
      "management_role_crud",
      "management_pengembang_crud",
      "management_data_master_ru",
      "management_setting_ru",
    ],
    header: "Management",
  },
  {
    id: "management_user_crud",
    title: "User Management",
    icon: <User size={20} />,
    navLink: "/user-management/list",
  },
  {
    id: "management_role_crud",
    title: "Role Management",
    icon: <Lock size={20} />,
    navLink: "/role-management/list",
  },
  {
    id: "management_pengembang_crud",
    title: "Pengembangan Perumahan",
    icon: <Package size={20} />,
    navLink: "/developer-management/list",
  },
  {
    id: "management_data_master_ru",
    title: "Data Master",
    icon: <Database size={20} />,
    navLink: "/data-master/list",
    children: [
      {
        id: "komponenPengajuan",
        title: "Komponen Pengajuan",
        icon: <FileText size={20} />,
        navLink: "/komponen-pengajuan/list",
      },
    ],
  },
  {
    id: "management_setting_ru",
    title: "Setting",
    icon: <Settings size={20} />,
    navLink: "/setting",
  },
  {
    id: ["admin_pengumuman_crud", "header"],
    header: "Admin Only",
  },
  {
    id: "admin_pengumuman_crud",
    title: "Pengumuman",
    icon: <Settings size={20} />,
    navLink: "/pengumuman/list",
  },
  {
    id: [
      "superadmin_wilayah_crud",
      "superadmin_dokumen_crud",
      "superadmin_panduan_crud",
      "superadmin_faq_crud",
    ],
    header: "SuperAdmin Only",
  },
  {
    id: "superadmin_wilayah_crud",
    title: "Wilayah",
    icon: <Map size={20} />,
    navLink: "/wilayah/list",
    children: [
      {
        id: "provinsi",
        title: "Provinsi",
        icon: <Circle />,
        navLink: "/wilayah/provinsi",
      },
      {
        id: "kabupatenKota",
        title: "Kabupaten / Kota",
        icon: <Circle />,
        navLink: "/wilayah/kabkota",
      },
      {
        id: "kecamatan",
        title: "Kecamatan",
        icon: <Circle />,
        navLink: "/wilayah/kecamatan",
      },
      {
        id: "desa",
        title: "Desa",
        icon: <Circle />,
        navLink: "/wilayah/desa",
      },
    ],
  },
  {
    id: "superadmin_dokumen_crud",
    title: "Dokumen",
    icon: <Settings size={20} />,
    navLink: "/dokumen/list",
  },
  {
    id: "superadmin_panduan_crud",
    title: "Panduan",
    icon: <Settings size={20} />,
    navLink: "/panduan/list",
  },
  {
    id: "superadmin_pengaturan_crud",
    title: "Pengaturan",
    icon: <Settings size={20} />,
    navLink: "/pengaturan/list",
  },
  {
    id: "superadmin_faq_crud",
    title: "FAQ",
    icon: <Settings size={20} />,
    navLink: "/faq/list",
  },
];

export default menu;
