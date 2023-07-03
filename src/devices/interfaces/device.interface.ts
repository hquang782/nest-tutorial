import { UUID } from "crypto";

export interface Device{
    name: string;
    mac_address: number;
    device_type_id: UUID
}