import { useState } from "react";

/**
 * @category Hook
 */
export function useAnchorEl() {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    return [anchorEl, (e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget), () => setAnchorEl(null)] as const;
}
