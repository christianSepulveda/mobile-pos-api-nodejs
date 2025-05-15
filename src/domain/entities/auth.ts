export type DeviceInfo = {
  deviceName: string;
  OS: string;
  IP: string;
};

export type Auth = {
  id?: string;
  userid: string;
  authtoken: string;
  deviceinfo: string;
  refreshtoken: string;
  active: boolean;
};
