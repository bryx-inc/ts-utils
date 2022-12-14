import { useState } from "react";
import { Maybe } from "../maybe";

export function useAnchorEl() {
    const [anchorEl, setAnchorEl] = useState<Maybe<HTMLDivElement>>(null);
    return [anchorEl, (e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget), () => setAnchorEl(null)] as const;
}
